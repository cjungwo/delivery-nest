import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createSamples() {
    const data = [
      {
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        stock: 10,
      },
      {
        name: 'Product 2',
        description: 'Description 2',
        price: 200,
        stock: 20,
      },
      {
        name: 'Product 3',
        description: 'Description 3',
        price: 300,
        stock: 30,
      },
    ];

    await this.productRepository.save(data);

    return this.productRepository.find();
  }
}
