import { NestFactory } from '@nestjs/core';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(FileUploadModule);

  // Set up validation globally (if needed)
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS if the front-end is on a different origin
  app.enableCors();

  // Listen on the port specified by the PORT environment variable
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
