import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { Bot } from '../bot/model/Bot';
import { DataParser } from 'src/@core/parser/DataParser';

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
      provide: DataParser,
      useValue: new DataParser(),
    },
    {
      provide: ProductService,
      useFactory: (bot: Bot, parser: DataParser) => {
        return new ProductService(bot, parser);
      },
      inject: [Bot, DataParser],
    },
  ],
})
export class ProductModule {}
