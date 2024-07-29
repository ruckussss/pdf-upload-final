import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor() {
    this.connect();
  }

  private async connect() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URI);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue('file_uploaded', { durable: true });
  }

  async sendMessage(queue: string, message: any) {
    this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }
}
