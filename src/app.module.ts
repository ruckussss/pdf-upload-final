import { Module } from '@nestjs/common';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ConfigModule } from './config/config.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { MongoModule } from './mongo/mongo.module';

@Module({
  imports: [
    ConfigModule,
    FileUploadModule,
    RabbitMQModule,
    MongoModule,
  ],
})
export class AppModule {}
