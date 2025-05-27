import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '../../entities/user.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity | undefined> {
    const user = await this.usersService.findByUsername(id); // Используем имя пользователя для примера
    return user === null ? undefined : user;
  }

  @Post()
  async create(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
    return await this.usersService.create(userData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<UserEntity>) {
    await this.usersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersService.remove(id);
  }
}
