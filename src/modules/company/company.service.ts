import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import { AdminCompanyListDto } from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository, createQueryBuilder } from 'typeorm';

@Injectable()
export class CompanyService extends BaseService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {
    super();
  }

  /**
   * find for all admin
   * TODO: relations [district and promotion]
   * @param adminCompanyListDto
   * @param pagination
   */
  async findAllForAdmin(
    adminCompanyListDto: AdminCompanyListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Company>> {
    const qb = this.companyRepo
      .createQueryBuilder('company')
      .select()
      .WhereAndOrder(adminCompanyListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  async findOneForAdmin(companyNo: number): Promise<Company> {
    const qb = this.companyRepo
      .createQueryBuilder('company')
      .where('company.no = :no', { no: companyNo });

    const company = await qb.getOne();
    if (!company) {
      throw new NotFoundException();
    }
    return company;
  }
}
