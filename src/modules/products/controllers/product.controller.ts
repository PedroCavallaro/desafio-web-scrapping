import { Controller, Get } from '@nestjs/common';

@Controller('products')
export class ProductController {
  @Get('a')
  getOi() {
    return 'oi';
  }
}
