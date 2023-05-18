import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import https from 'https';
import fs from 'fs';
import path from 'path';

async function bootstrap() {
  
  // Logger
  const app = await NestFactory.create(AppModule, {
    // logger: console
  });
  
  // Xác thực loại dữ liệu được đẩy lên website
  app.useGlobalPipes(new ValidationPipe());

  // Cookie
  app.use(cookieParser());

  // Compression
  app.use(compression());
  
  await app.listen(3000);
  const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
  })
  sslServer.listen(1433, () => console.log('Secure server 🚀🔑 on port 1433'));
}
bootstrap();