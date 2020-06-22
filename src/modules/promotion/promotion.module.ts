import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './promotion.entity';
import { PromotionProperty } from '../promotion-property/promotion-property.entity';
import { PromotionPropertyType } from '../promotion-property-type/promotion-property-type.entity';
import { PromotionService } from './promotion.service';
import { Company } from '../company/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      Promotion,
      PromotionProperty,
      PromotionPropertyType,
    ]),
  ],
  controllers: [],
  providers: [PromotionService],
})
export class PromotionModule {}
