import { Module } from '@nestjs/common';
import { ScrapperModule } from './steps/scrapper/scrapper.module';

@Module({
  imports: [ScrapperModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
