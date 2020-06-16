import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { AdminBrandController } from './admin-brand.controller';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { FoodCategory } from '../food-category/food-category.entity';
import { SpaceTypeBrandMapper } from '../space-type-brand-mapper/space-type-brand-mapper.entity';
import { SpaceType } from '../space-type/space-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Brand,
      FoodCategory,
      SpaceTypeBrandMapper,
      SpaceType,
    ]),
  ],
  controllers: [AdminBrandController, BrandController],
  exports: [],
  providers: [BrandService],
})
export class BrandModule {}
