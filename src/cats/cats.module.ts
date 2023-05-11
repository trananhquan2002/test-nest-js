import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { BullModule } from '@nestjs/bull';
import { CatsConsumer } from './cats.consumer';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CatsService } from './cats.service';
// import { Cat } from './entities/cat.entity';

@Module({
  imports: [
    // Phương thức registerQueue dùng để khởi tạo hoặc đăng ký hàng đợi
    BullModule.registerQueue({
      name: 'cat',
    }),
    //! Database TypeOrm
    // TypeOrmModule.forFeature([ Cat ]),
  ],
  controllers: [CatsController],
  providers: [CatsConsumer]
})
export class CatsModule {}