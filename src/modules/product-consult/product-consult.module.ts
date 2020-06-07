import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductConsult } from './product-consult.entity';
import { AdminProductConsultController } from './admin-product-consult.controller';
import { ProductConsultService } from './product-consult.service';
import { Admin } from '../admin';
import { NanudaUser } from '../nanuda-user';
import { ProductConsultController } from './product-consult.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductConsult, Admin, NanudaUser])],
  controllers: [AdminProductConsultController, ProductConsultController],
  providers: [ProductConsultService],
})
export class ProductConsultModule {}
