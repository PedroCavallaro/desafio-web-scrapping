import { Module } from '@nestjs/common';
import { ScrapperService } from './services/scrapper.service';
import { Bot } from '../bot/model/Bot';
import { Filter } from '../filter/Filter';
import { ProductDataParser } from '../parser/productDataParser.service';
import { ScrapperController } from './scrapper.controller';

@Module({
  imports: [],
  controllers: [ScrapperController],
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
      provide: ProductDataParser,
      useValue: new ProductDataParser(),
    },
    {
      provide: ScrapperService,
      useFactory: (bot: Bot, parser: ProductDataParser, filter: Filter) => {
        return new ScrapperService(bot, parser, filter);
      },
      inject: [Bot, ProductDataParser, Filter],
    },
  ],
})
export class ScrapperModule {}
