import { Module } from '@nestjs/common';
import { ScrapperService } from './services/scrapper.service';
import { Bot } from '../bot/model/Bot';
import { FilterService } from '../filter/Filter.service';
import { ProductDataParserService } from '../parser/productDataParser.service';
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
      provide: FilterService,
      useValue: new FilterService(),
    },
    {
      provide: ProductDataParserService,
      useValue: new ProductDataParserService(),
    },
    {
      provide: ScrapperService,
      useFactory: (
        bot: Bot,
        parser: ProductDataParserService,
        filter: FilterService,
      ) => {
        return new ScrapperService(bot, parser, filter);
      },
      inject: [Bot, ProductDataParserService, FilterService],
    },
  ],
})
export class ScrapperModule {}
