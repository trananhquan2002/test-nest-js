import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/entities/cat.entity';

@Module({
  imports: [
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
    }), UsersModule, CatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}