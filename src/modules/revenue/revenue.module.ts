import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentList } from '../dashboard/dashboard.entity';
import { RevenueService } from './revenue.service';
import { AdminRevenueController } from './admin-revenue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentList], 'kitchen')],
  controllers: [AdminRevenueController],
  providers: [RevenueService],
})
export class RevenueModule {}
