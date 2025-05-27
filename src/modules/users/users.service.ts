
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) { }

  async create(userData: Partial<UserEntity>): Promise<UserEntity> {
    const newUser = this.usersRepository.create(userData);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async update(id: string, data: Partial<UserEntity>): Promise<void> {
    await this.usersRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
