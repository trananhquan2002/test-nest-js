import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors, StreamableFile, Res, Header } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CatsService } from './cats.service';
import { EventDemo } from './events/event.demo';
import { FileInterceptor } from '@nestjs/platform-express';
import { SampleDto } from './dto/sample.dto';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService, private readonly eventDemo: EventDemo) {}
  
  // Axios
  @Get('theFall2')
  async findAll2() {
    const response = await this.catsService.findAll();
    return response;
  }

  // Streamming file cach 2
  @Get('file2')
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  getStaticFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }

  // Streamming file
  @Get('file')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }

  // Upload file
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Body() body: SampleDto, @UploadedFile() file: Express.Multer.File) {
    return {
      body,
      file: file
    };
  }

  // Events
  @Get('emitEvent')
  emitEvent() {
    this.eventDemo.emitEvent();
  }

  // Queue
  @Post('notify')
  async notification(@Body() createCatDto: Cat) {
    this.catsService.notification(createCatDto);
    return createCatDto;
  }

  // Type ORM
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