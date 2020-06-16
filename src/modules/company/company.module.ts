import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { AdminCompanyController } from './admin-company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [AdminCompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
