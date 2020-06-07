import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { PaymentList } from './dashboard.entity';

@Injectable()
export class DashboardService extends BaseService {
  constructor(
    // @InjectConnection('kitchen') private connection: Connection,
    @InjectRepository(PaymentList, 'kitchen')
    private readonly paymentListRepo: Repository<PaymentList>,
  ) {
    super();
  }

  async findAll() {
    return await this.paymentListRepo.findOne({
      paymentListNo: 1999,
    });
  }
}
