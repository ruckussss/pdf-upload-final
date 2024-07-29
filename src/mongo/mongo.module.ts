import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';
import { ConfigService } from '../config/config.service';

@Module({
  providers: [MongoService, ConfigService],
  exports: [MongoService],
})
export class MongoModule {}
