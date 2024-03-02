import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { FilterProductsDTO } from 'src/@core/dtos/FilterProductsDTO';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Produtos')
@Controller('products')
export class ProductController {
  @Inject(ProductService)
  private readonly ps: ProductService;

  @Get('/:id')
  async getOi(@Param('id') id: string) {
    console.log('a');
    const res = await this.ps.getProductById(id);

    return res;
  }

  @Get()
  @ApiQuery({ name: 'nova' })
  @ApiQuery({ name: 'nutrition' })
  async getByNutrition(@Query() query: FilterProductsDTO) {
    await this.ps.getProductsByScore(query);
  }
}
