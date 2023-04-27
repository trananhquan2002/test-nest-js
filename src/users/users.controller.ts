import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: User) {
    const response = await this.usersService.create(createUserDto);
    return response;
  }

  @Get()
  async findAll() {
    const response = await this.usersService.findAll()
    return response;
  }

  @Get(':id')
  async findOne(@Param() id: number) {
    const response = await this.usersService.findOne(id);
    return response;
  }

  @Put(':id')
  async update(@Param() id: number, @Body() user: User) {
    const response = await this.usersService.update(id, user);
    return response;
  }

  @Delete(':id')
  async delete(@Param() id: number) {
    const response = await this.usersService.remove(id);
    return response;
  }
}