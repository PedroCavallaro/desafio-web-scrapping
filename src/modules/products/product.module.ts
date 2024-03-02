import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { Bot } from '../bot/model/Bot';
import { DataParser } from 'src/@core/parser/DataParser';
import { Filter } from 'src/@core/filter/Filter';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: Bot,
      useFactory: () => {
        return new Bot();
      },
    },
    {
      provide: Filter,
      useValue: new Filter(),
    },
    {
      provide: DataParser,
      useValue: new DataParser(),
    },
    {
      provide: ProductService,
      useFactory: (bot: Bot, parser: DataParser, filter: Filter) => {
        return new ProductService(bot, parser, filter);
      },
      inject: [Bot, DataParser, Filter],
    },
  ],
})
export class ProductModule {}
