import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
// import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { EventEmitterModule } from '@nestjs/event-emitter';
import { Cat } from './cats/entities/cat.entity';
// const tls = require('tls');
// const secureContext = (tls.createSecureContext) ? tls.createSecureContext : require('tls').createSecureContext;
// const tlsOptions = {
//   secureContext,
// };

@Module({
  imports: [
    // CatsModule,
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),

    // import ConfigModule from '@nestjs/config
    // Configuration
    // Configuration dùng để cấu hình môi trường . Do các ứng dụng thường chạy trong các môi trường khác nhau . Tùy vào môi trường mà cài đặt cấu hình nên được sử dụng
    // ConfigModule.forRoot(),

    // Database
    // Object Relational Mapper (ORM) cho phép ánh xạ cơ sở dữ liệu đến các đối tượng thuộc ngôn ngữ lập trình hướng đối tượng
    
    // Connect to SQL Server
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.10.131',
      port: 1433,
      domain: 'ECOM',
      username: 'ecom1',
      password: 'KidsPlz@18006608',
      database: 'HOKIDS_TEST',
      entities: [Cat],
      synchronize: false,
      options: {
        encrypt: false,
      },
    }),
    CatsModule,

    // Connect Database SQL Server localhost
    // TypeOrmModule.forRoot({
    //   type: 'mssql',
    //   host: 'localhost',
    //   port: 1433,
    //   authentication: {
    //     type: 'default',
    //     options: {
    //       userName: 'sa',
    //       password: 'kidsplaza@'
    //     }
    //   },
    //   options: {
    //     encrypt: false,
    //     cryptoCredentialsDetails: {
    //       minVersion: 'TLSv1'
    //     },
    //   },
    //   database: 'HOKIDS_TEST',
    //   extra: {
    //     trustServerCertificate: true,
    //     trustedConnection: false,
    //     cryptoCredentialsDetails: tls.createSecureContext,
    //   },
    //   entities: [
    //     Cat
    //   ],
    // }),
    // CatsModule,

    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'testnestjs',
    //   entities: [
    //     User,
    //     Cat
    //   ],
    //   synchronize: true,
    // }),
    // UsersModule,
    // CatsModule,
    // EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }