import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import { AdminSpaceListDto } from './dto';
import { PaginatedRequest, PaginatedResponse, YN } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from './space.entity';
import { Repository } from 'typeorm';
import { SPACE_TYPE, SPACE, AMENITY } from 'src/shared';
import { Promotion } from '../promotion/promotion.entity';

@Injectable()
export class SpaceService extends BaseService {
  constructor(
    @InjectRepository(Space) private readonly spaceRepo: Repository<Space>,
  ) {
    super();
  }

  /**
   * get space list for admin with relations
   * @param adminSpaceListDto
   * @param pagination
   */
  async findAll(
    adminSpaceListDto: AdminSpaceListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Space>> {
    const qb = this.spaceRepo
      .createQueryBuilder('space')
      .CustomLeftJoinAndSelect(['nanudaUser', 'admin', 'deliverySpaceOptions'])
      .leftJoinAndSelect('space.companyDistricts', 'companyDistricts')
      .leftJoinAndSelect('companyDistricts.company', 'company')
      .WhereAndOrder(adminSpaceListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * get one space for admin
   * @param spaceNo
   */
  async findOne(spaceNo: number): Promise<Space> {
    const checkSpace = await this.spaceRepo.findOne({
      where: { no: spaceNo, delYn: YN.NO },
    });
    if (!checkSpace) {
      throw new NotFoundException();
    }
    const qb = this.spaceRepo
      .createQueryBuilder('space')
      .CustomLeftJoinAndSelect([
        'nanudaUser',
        'admin',
        'brands',
        'companyDistricts',
        'deliverySpaceOptions',
        'amenities',
      ])
      .leftJoinAndSelect('companyDistricts.company', 'company')
      .leftJoinAndSelect('space.promotions', 'promotions')
      .leftJoinAndSelect('promotions.company', 'companies')
      .leftJoinAndSelect(
        'promotions.promotionProperties',
        'promotionProperties',
      )
      .andWhere('space.no = :no', { no: spaceNo })
      .andWhere('space.delYn = :delYn', { delYn: YN.NO });
    const space = await qb.getOne();
    return space;
  }
}
