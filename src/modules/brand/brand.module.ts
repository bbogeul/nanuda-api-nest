import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { AdminBrandController } from './admin-brand.controller';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [AdminBrandController, BrandController],
  exports: [],
  providers: [BrandService],
})
export class BrandModule {}
