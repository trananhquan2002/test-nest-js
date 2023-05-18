import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { EventDemo } from './events/event.demo';
import { HttpModule } from '@nestjs/axios';
import { CatsProcessor } from './cats.processor';

@Module({
  imports: [
    // Axios
    HttpModule,
    
    // Queue
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
  providers: [CatsService, CatsProcessor, EventDemo],
})
export class CatsModule {}