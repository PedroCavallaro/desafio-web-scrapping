import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [],
  controllers: [ProductModule],
  providers: [],
})
export class AppModule {}
