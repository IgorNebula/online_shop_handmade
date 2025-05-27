// src/modules/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../entities/product.entity';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) { }

  async create(productData: Partial<ProductEntity>): Promise<ProductEntity> {
    const newProduct = this.productsRepository.create(productData);
    return await this.productsRepository.save(newProduct);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productsRepository.find();
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const numericId = Number(id);
    return await this.productsRepository.findOne({ where: { id: numericId } });
  }

  async update(id: string, data: Partial<ProductEntity>): Promise<void> {
    await this.productsRepository.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
