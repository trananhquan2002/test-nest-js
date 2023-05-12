import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { BullModule } from '@nestjs/bull';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Cat } from './cats/entities/cat.entity';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    CatsModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    // import ConfigModule from '@nestjs/config
    // Configuration
    // Configuration dùng để cấu hình môi trường . Do các ứng dụng thường chạy trong các môi trường khác nhau . Tùy vào môi trường mà cài đặt cấu hình nên được sử dụng
    ConfigModule.forRoot(),

    // Database
    // Object Relational Mapper (ORM) cho phép ánh xạ cơ sở dữ liệu đến các đối tượng thuộc ngôn ngữ lập trình hướng đối tượng
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'testnestjs',
      entities: [
        User,
        Cat
      ],
      synchronize: true,
    }),
    UsersModule,
    CatsModule,
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}