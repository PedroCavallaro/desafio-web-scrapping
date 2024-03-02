import { Controller, Get, Inject, Param, Query, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterProductsDTO } from 'src/helpers/dtos/FilterProductsDTO';
import { ScrapperService } from './services/scrapper.service';
import { Response } from 'express';

@ApiTags('Produtos')
@Controller('products')
export class ScrapperController {
  @Inject(ScrapperService)
  private readonly scrapper: ScrapperService;

  @Get('/:id')
  async getProductById(@Param('id') id: string, @Res() res: Response) {
    const product = await this.scrapper.getProductById(id);
    if (product.error) {
      return res.status(400).json({ error: true, message: product.error });
    }
    console.log('Informações do produto');
    console.log(product.getValue());
    return res.status(200).json(product.getValue());
  }

  @Get()
  @ApiQuery({ name: 'nova' })
  @ApiQuery({ name: 'nutrition' })
  async getByNutrition(@Query() query: FilterProductsDTO) {
    const res = await this.scrapper.getProductsByScore(query);
    console.log('Produtos encontrados');
    console.log('====================');
    console.log(res.getValue());
    return res.getValue();
  }
}
