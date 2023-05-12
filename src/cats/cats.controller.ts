import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Post('notify')
  async notification(@Body() createCatDto: Cat) {
    this.catsService.notification(createCatDto);
    return createCatDto;
  }

  @Post()
  async create(@Body() createCatDto: Cat) {
    const response = await this.catsService.create(createCatDto);
    return response;
  }

  @Get()
  async findAll() {
    const response = await this.catsService.findAll();
    return response;
  }

  @Get(':id')
  async findOne(@Param(':id') id: number) {
    const response = await this.catsService.findOne(id);
    return response;
  }

  @Put(':id')
  async update(@Param() id: number, @Body() cat: Cat) {
    const response = await this.catsService.update(id, cat);
    return response;
  }

  @Delete(':id')
  async delete(@Param() id: number) {
    const response = await this.catsService.remove(id);
    return response;
  }
}