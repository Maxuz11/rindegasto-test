import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enviromentVariables } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(enviromentVariables.port);
}
bootstrap();
