import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console
  });
  // Xác thực loại dữ liệu được đẩy lên website
  app.useGlobalPipes(new ValidationPipe());

  // Cookie
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();