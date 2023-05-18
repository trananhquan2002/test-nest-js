import { Body, Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';


@Injectable()
export class CatsService {
  constructor(
    @InjectQueue('notification') private queue: Queue, 
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
    private http: HttpService
  ) {}
  
  async notification(@Body() createCatDto: Cat) {
    return createCatDto;
  }
  
  async create(cat: Cat): Promise<Cat> {
    return await this.catRepository.save(cat);
  }

  async findAll(): Promise<Cat[]> {
    return await this.catRepository.find();
  }

  // Axios dùng để fetch api và trả về dữ liệu cho người dùng
  async findAll2(): Promise<Observable<AxiosResponse<Cat[], any>>> {
    return this.http.get('http://localhost:3000/cats');
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