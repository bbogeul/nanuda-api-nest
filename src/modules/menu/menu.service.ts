import { Injectable } from '@nestjs/common';
import { Menu } from './menu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core';
import { AdminMenuListDto } from './dto';
import { PaginatedRequest, PaginatedResponse, YN } from 'src/common';

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
      .CustomInnerJoinAndSelect(['brand'])
      .WhereAndOrder(adminMenuListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * find one for admin with query builder
   * @param mapId
   */
  async findOneForAdmin(mapId: number): Promise<Menu> {
    const qb = this.menuRepo
      .createQueryBuilder('menu')
      .select()
      .CustomInnerJoinAndSelect(['brand'])
      .where('menu.no = :no', { no: mapId })
      .andWhere('menu.delYn = :delYn', { delYn: YN.NO });
    const menu = await qb.getOne();

    return menu;
  }
}
