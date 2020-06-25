import { Injectable, NotFoundException } from '@nestjs/common';
import { Menu } from './menu.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core';
import {
  AdminMenuListDto,
  AdminMenuCreateDto,
  AdminMenuUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse, YN } from 'src/common';
import { Brand } from '../brand/brand.entity';

@Injectable()
export class MenuService extends BaseService {
  constructor(
    @InjectRepository(Menu) private readonly menuRepo: Repository<Menu>,
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
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
   * find one for admin with query
   * @param menuId
   */
  async findOne(menuId: number): Promise<Menu> {
    const qb = this.menuRepo
      .createQueryBuilder('menu')
      .select()
      .CustomInnerJoinAndSelect(['brand'])
      .where('menu.no = :no', { no: menuId })
      .andWhere('menu.delYn = :delYn', { delYn: YN.NO });
    const menu = await qb.getOne();

    return menu;
  }

  /**
   *
   * @param adminMenuCreateDto
   */
  async create(adminMenuCreateDto: AdminMenuCreateDto): Promise<Menu> {
    let menu = new Menu(adminMenuCreateDto);
    const checkBrand = await this.brandRepo.findOne({
      where: { no: adminMenuCreateDto.brandNo, delYn: YN.NO },
    });
    if (!checkBrand) {
      throw new NotFoundException({ message: 'Brand not found', error: 404 });
    }
    menu = await this.menuRepo.save(menu);
    return menu;
  }

  /**
   * update menu
   * @param menuNo
   * @param adminMenuUpdateDto
   */
  async update(
    menuNo: number,
    adminMenuUpdateDto: AdminMenuUpdateDto,
  ): Promise<Menu> {
    let menu = await this.menuRepo.findOne({
      where: { no: menuNo, delYn: YN.NO },
    });
    if (!menu) {
      throw new NotFoundException();
    }
    menu = menu.set(adminMenuUpdateDto);
    return await this.menuRepo.save(menu);
  }
}
