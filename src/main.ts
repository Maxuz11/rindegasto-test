import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enviromentVariables } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  await app.listen(enviromentVariables.port ?? 3000);
}
bootstrap();
