import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentList } from '../dashboard/dashboard.entity';
import { Repository } from 'typeorm';
import { AdminRevenueListDto } from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';

@Injectable()
export class RevenueService extends BaseService {
  constructor(
    @InjectRepository(PaymentList, 'kitchen')
    private readonly paymentListRepo: Repository<PaymentList>,
  ) {
    super();
  }

  /**
   * get revenue for admin
   * @param adminRevenueListDto
   * @param pagination
   */
  async findAll(
    adminRevenueListDto: AdminRevenueListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<PaymentList>> {
    const qb = this.paymentListRepo
      .createQueryBuilder('revenue')
      .select()
      .WhereAndOrder(adminRevenueListDto)
      .Paginate(pagination);

    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * revenue find one
   * @param revenueId
   */
  async findOne(revenueId: number): Promise<PaymentList> {
    const revenue = await this.paymentListRepo.findOne(revenueId);
    if (!revenue) {
      throw new NotFoundException();
    }
    return revenue;
  }
}
