import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,
  ) { }

  async create(orderData: Partial<OrderEntity>): Promise<OrderEntity> {
    const newOrder = this.ordersRepository.create(orderData);
    return await this.ordersRepository.save(newOrder);
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersRepository.find();
  }

  async findById(id: number): Promise<OrderEntity | null> {
    return await this.ordersRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<OrderEntity>): Promise<void> {
    await this.ordersRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
