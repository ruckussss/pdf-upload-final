import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as FormData from 'form-data';
import { ConfigService } from '../config/config.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { MongoClient } from 'mongodb';
import { Express } from 'express'; // Add this import

@Injectable()
export class FileUploadService {
  private mongoClient: MongoClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly rabbitmqService: RabbitMQService,
  ) {
    this.mongoClient = this.configService.getMongoClient();
  }

  async uploadFile(file: Express.Multer.File, id: string, parameter1: string, parameter2: string) {
    const filePath = path.join(__dirname, '..', '..', 'uploads', file.originalname);

    try {
      const writeStream = fs.createWriteStream(filePath);
      writeStream.write(file.buffer);
      writeStream.end();

      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      const form = new FormData();
      form.append('files[]', fs.createReadStream(filePath));

      const response = await axios.post('https://vendor-api-qa.venwiz.com/api/v1/file/open-uploads', form, {
        headers: {
          ...form.getHeaders(),
        },
      });

      const fileUrl = response.data[0].fileUrl;

      // Save file information to MongoDB
      await this.saveFileData(id, fileUrl, parameter1, parameter2);

      // Publish the message to RabbitMQ
      await this.rabbitmqService.sendMessage('file_uploaded', { id, fileUrl, parameter1, parameter2 });

      return {message: 'Recieved files and send to RabbitMQ'};
    } catch (error) {
      console.error('Error during file upload:', error);
      throw error;
    }
  }

  async handleResults(id: string, fileUrl: string, parameter1: string, parameter2: string) {
    try {
      return { message: 'Results successfully sent to retool' };
    } catch (error) {
      console.error('Error handling results:', error);
      throw error;
    }
  }

  private async saveFileData(id: string, fileUrl: string, parameter1: string, parameter2: string) {
    const database = this.mongoClient.db('vendor-profile'); // Replace with your database name
    const collection = database.collection('pdf-app'); // Replace with your collection name

    const document = { id, fileUrl, parameter1, parameter2, createdAt: new Date() };
    await collection.insertOne(document);
  }
}
