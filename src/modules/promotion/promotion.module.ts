import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './promotion.entity';
import { PromotionProperty } from '../promotion-property/promotion-property.entity';
import { PromotionPropertyType } from '../promotion-property-type/promotion-property-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Promotion,
      PromotionProperty,
      PromotionPropertyType,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class PromotionModule {}
