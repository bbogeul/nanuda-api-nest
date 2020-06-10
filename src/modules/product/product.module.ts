import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { AdminProductController } from './admin-product.controller';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [AdminProductController, ProductController],
  providers: [ProductService],
  exports: [],
})
export class ProductModule {}
