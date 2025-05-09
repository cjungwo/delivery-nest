import { Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('samples')
  async createSamples() {
    return this.productService.createSamples();
  }
}
