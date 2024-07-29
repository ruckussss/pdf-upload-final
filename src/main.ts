import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up validation globally (if needed)
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS if the front-end is on a different origin
  app.enableCors();

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
