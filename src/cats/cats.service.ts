import { Body, Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(@InjectQueue('notification') private queue: Queue, @InjectRepository(Cat) private catRepository: Repository<Cat>) {}
  async notification(@Body() createCatDto: Cat) {
    await this.queue.add('notification-cat', {
      data: createCatDto
    });
  }
  
  async create(cat: Cat): Promise<Cat> {
    return await this.catRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return await this.catRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    return await this.catRepository.findOneBy({id: id});
  }

  async update(id: number, cat: Cat) {
    await this.catRepository.update(id, cat);
    return this.catRepository.findOneBy({id: id});
  }

  async remove(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }
}