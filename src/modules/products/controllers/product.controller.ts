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

    return res;
  }

  @Get('?nutrition=:nutrition&nova=:nova&eco=:eco')
  getByNutrition(
    @Param('nutrition') nutrition: string,
    @Param('nova') nova: string,
    @Param('eco') eco: string,
  ) {
    console.log(nutrition);
    console.log(nova);
    console.log(eco);
  }
}
