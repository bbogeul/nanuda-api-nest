import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentList } from './dashboard.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentList], 'kitchen')],
  controllers: [DashboardController],
  exports: [],
  providers: [DashboardService],
})
export class DashboardModule {}
