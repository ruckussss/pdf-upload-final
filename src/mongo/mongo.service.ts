import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongoService {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.client.connect().catch(err => {
      console.error('MongoDB connection error:', err);
    });
  }

  getClient(): MongoClient {
    return this.client;
  }
}
