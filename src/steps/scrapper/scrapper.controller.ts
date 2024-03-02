import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterProductsDTO } from 'src/helpers/dtos/FilterProductsDTO';
import { ScrapperService } from './services/scrapper.service';

@ApiTags('Produtos')
@Controller('products')
export class ScrapperController {
  @Inject(ScrapperService)
  private readonly scrapper: ScrapperService;

  @Get('/:id')
  async getOi(@Param('id') id: string) {
    console.log('a');
    const res = await this.scrapper.getProductById(id);

    return res;
  }

  @Get()
  @ApiQuery({ name: 'nova' })
  @ApiQuery({ name: 'nutrition' })
  async getByNutrition(@Query() query: FilterProductsDTO) {
    await this.scrapper.getProductsByScore(query);
  }
}
