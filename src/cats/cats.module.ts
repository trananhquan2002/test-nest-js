import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { CatsConsumer } from './cats.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
      redis: {
        maxRetriesPerRequest: null,
      }
    }),
    // Database TypeOrm
    TypeOrmModule.forFeature([ Cat ]),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsConsumer],
})
export class CatsModule {}