import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderEntity } from '../../entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<OrderEntity | null> {
    return await this.ordersService.findById(id);
  }

  @Post()
  async create(@Body() orderData: Partial<OrderEntity>): Promise<OrderEntity> {
    return await this.ordersService.create(orderData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<OrderEntity>) {
    await this.ordersService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.ordersService.remove(id);
  }
}
