import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { AdminCompanyController } from './admin-company.controller';
import { CompanyService } from './company.service';
import { CompanyDistrict } from '../company-district/company-district.entity';
import { Promotion } from '../promotion/promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyDistrict, Promotion])],
  controllers: [AdminCompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
