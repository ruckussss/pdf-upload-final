import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { ConfigModule } from '../config/config.module';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';

@Module({
  imports: [ConfigModule, RabbitMQModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
