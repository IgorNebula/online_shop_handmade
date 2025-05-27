// src/modules/products/products.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from '../../entities/product.entity';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductEntity | undefined> {
    const product = await this.productsService.findById(id);
    return product === null ? undefined : product;
  }

  @Post()
  async create(@Body() productData: Partial<ProductEntity>): Promise<ProductEntity> {
    return await this.productsService.create(productData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<ProductEntity>) {
    await this.productsService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.productsService.remove(id);
  }
}
