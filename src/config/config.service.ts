import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import configuration from './configuration';

@Injectable()
export class ConfigService {
  private mongoClient: MongoClient;

  constructor() {
    const config = configuration();
    if (!config.mongoUri) {
      throw new Error('MongoDB connection string is not defined');
    }
    this.mongoClient = new MongoClient(config.mongoUri);
  }

  getMongoClient() {
    return this.mongoClient;
  }
}
