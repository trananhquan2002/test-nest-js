import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
const tls = require('tls');
const secureContext = (tls.createSecureContext) ? tls.createSecureContext : require('tls').createSecureContext;
const tlsOptions = {
   secureContext,
};

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CatsModule,

    // import ConfigModule from '@nestjs/config
    // Configuration
    // Configuration dùng để cấu hình môi trường . Do các ứng dụng thường chạy trong các môi trường khác nhau . Tùy vào môi trường mà cài đặt cấu hình nên được sử dụng
    ConfigModule.forRoot(),

    // Database
    // Object Relational Mapper (ORM) cho phép ánh xạ cơ sở dữ liệu đến các đối tượng thuộc ngôn ngữ lập trình hướng đối tượng
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '192.168.10.131',
      port: 1433,
      authentication: {
        type: 'default',
        options: {
          userName: 'ecom1',
          password: 'KidsPlz@18006608',
        }
      },
      options: {
        encrypt: true,
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
          tls: {
            rejectUnauthorized: false,
          }
        }
      },
      database: 'HOKIDS_TEST',
      synchronize: true,
      extra: {
        trustServerCertificate: true,
        cryptoCredentialsDetails: tls.createSecureContext,
      },
      // ssl: {
      //   key: fs.readFileSync(path.resolve('../privkey.key')),
      //   cert: fs.readFileSync(path.resolve('../cacert.crt')),
      // },
    }),

    // Type ORM mysql
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'testnestjs',
    //   synchronize: true,
    //   entities: [
    //     User,
    //     Cat
    //   ],
    // }),
    // UsersModule,
    // CatsModule,

    // Event
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }