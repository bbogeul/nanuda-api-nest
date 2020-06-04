import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentList } from './dashboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentList])],
  controllers: [],
  exports: [],
  providers: [],
})
export class DashboardModule {}
