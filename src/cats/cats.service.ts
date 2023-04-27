import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catRepository: Repository<Cat>) { }
  create(cat: Cat): Promise<Cat> {
    return this.catRepository.save(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  findOne(id: number): Promise<Cat> {
    return this.catRepository.findOneBy({id: id});
  }

  async update(id: number, cat: Cat) {
    await this.catRepository.update(id, cat);
  }

  async remove(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }
}