import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as FormData from 'form-data';

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File) {
    // Define the local file path
    const filePath = path.join(__dirname, '..', '..', 'uploads', file.originalname);

    // Save file locally
    try {
      // Create a readable stream for the file to be uploaded
      const writeStream = fs.createWriteStream(filePath);
      writeStream.write(file.buffer);
      writeStream.end();

      // Wait for the file to be fully written
      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      // Prepare the file for upload
      const form = new FormData();
      form.append('files[]', fs.createReadStream(filePath));

      // Upload file to the external API
      const response = await axios.post('https://vendor-api-qa.venwiz.com/api/v1/file/open-uploads', form, {
        headers: {
          ...form.getHeaders(),
        },
      });
      
      const fileUrl = response.data[0].fileUrl;
      return { fileUrl };
    } catch (error) {
      console.error('Error during file upload:', error);
      throw error;
    }
  }
}
