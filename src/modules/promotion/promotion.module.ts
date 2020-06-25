import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './promotion.entity';
import { PromotionProperty } from '../promotion-property/promotion-property.entity';
import { PromotionPropertyType } from '../promotion-property-type/promotion-property-type.entity';
import { PromotionService } from './promotion.service';
import { Company } from '../company/company.entity';
import { AdminPromotionController } from './admin-promotion.controller';
import { PromotionSpaceMapper } from '../promotion-space-mapper/promotion-space-mapper.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      Promotion,
      PromotionProperty,
      PromotionPropertyType,
      PromotionSpaceMapper,
    ]),
  ],
  controllers: [AdminPromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
