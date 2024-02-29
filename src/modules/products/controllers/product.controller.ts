import { Controller, Get, Inject, Param, Req } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Request } from 'express';

@Controller('products')
export class ProductController {
  @Inject(ProductService)
  private readonly ps: ProductService;

  @Get('/:id')
  async getOi(@Param('id') id: string) {
    const res = await this.ps.getProductById(id);
    console.log(res);
    return 'oi';
  }

  @Get('')
  getByNutrition(@Req() req: Request) {
    console.log(req);
  }
}
