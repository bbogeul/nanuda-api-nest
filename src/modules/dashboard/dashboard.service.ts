import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { PaymentList } from './dashboard.entity';
import { AdminDashboardDayGraphDto } from './dto';
import { ChartData, Dataset } from './interfaces/chart-graph.type';
import * as moment from 'moment';
@Injectable()
export class DashboardService extends BaseService {
  constructor(
    // @InjectConnection('kitchen') private connection: Connection,
    @InjectRepository(PaymentList, 'kitchen')
    private readonly paymentListRepo: Repository<PaymentList>,
  ) {
    super();
  }

  /**
   * day graph for dashboard
   * @param adminDashboardDayGraphDto
   */
  async graphByDays(adminDashboardDayGraphDto: AdminDashboardDayGraphDto) {
    const chartData = new ChartData();
    const labels = [];
    for (let i = 0; i < adminDashboardDayGraphDto.days; i++) {
      labels.unshift(
        moment()
          .subtract(`${i}`, 'days')
          .format('YYYY-MM-DD'),
      );
    }
    // assign dates to labels
    chartData.labels = labels;
    return chartData;
  }
}
