import { Injectable } from '@nestjs/common';
import { Menu } from './menu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core';
import { AdminMenuListDto } from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';

@Injectable()
export class MenuService extends BaseService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepo: Repository<Menu>,
  ) {
    super();
  }

  /**
   * get menu for admin
   * @param adminMenuListDto
   * @param pagination
   */
  async findAll(
    adminMenuListDto: AdminMenuListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Menu>> {
    const qb = this.menuRepo
      .createQueryBuilder('Menu')
      .WhereAndOrder(adminMenuListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }
}
