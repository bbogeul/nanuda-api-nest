import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './space.entity';
import { AdminSpaceController } from './admin-space.controller';
import { SpaceService } from './space.service';
import { SpaceAnalysisService } from './space-analysis.service';
import { SpaceBrandMapper } from '../space-brand-mapper/space-brand-mapper.entity';
import { CompanyDistrictSpaceMapper } from '../company-district-space-mapper/company-district-space-mapper.entity';
import { CompanyDistrict } from '../company-district/company-district.entity';
import { Amenity } from '../amenity/amenity.entity';
import { AmenitySpaceMapper } from '../amenity-space-mapper/amenity-space-mapper.entity';
import { DeliverySpaceOption } from '../delivery-space-option/delivery-space-option.entity';
import { DeliverySpaceOptionSpaceMapper } from '../delivery-space-option-space-mapper/delivery-space-option-space-mapper.entity';
import { Promotion } from '../promotion/promotion.entity';
import { PromotionSpaceMapper } from '../promotion-space-mapper/promotion-space-mapper.entity';
import { SpaceAnalysisSenderService } from './space-analysis-sender.service';
import { SpaceController } from './space.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Space,
      SpaceBrandMapper,
      Amenity,
      AmenitySpaceMapper,
      CompanyDistrict,
      CompanyDistrictSpaceMapper,
      DeliverySpaceOption,
      DeliverySpaceOptionSpaceMapper,
      Promotion,
      PromotionSpaceMapper,
    ]),
  ],
  controllers: [AdminSpaceController, SpaceController],
  providers: [SpaceService, SpaceAnalysisService, SpaceAnalysisSenderService],
})
export class SpaceModule {}
