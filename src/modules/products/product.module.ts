import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { Bot } from '../bot/model/Bot';

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
      provide: ProductService,
      useFactory: (bot: Bot) => {
        return new ProductService(bot);
      },
      inject: [Bot],
    },
  ],
})
export class ProductModule {}
