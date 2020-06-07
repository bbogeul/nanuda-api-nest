import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentList } from './dashboard.entity';
import { AdminDashboardController } from './admin-dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentList], 'kitchen')],
  controllers: [AdminDashboardController],
  exports: [],
  providers: [DashboardService],
})
export class DashboardModule {}
