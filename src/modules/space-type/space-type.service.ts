import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseController } from 'src/core';
import {
  AdminSpaceTypeListDto,
  AdminSpaceTypeCreateDto,
  AdminSpaceTypeUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse, YN } from 'src/common';
import { SpaceType } from './space-type.entity';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { SpaceTypeBrandMapper } from '../space-type-brand-mapper/space-type-brand-mapper.entity';

@Injectable()
export class SpaceTypeService extends BaseController {
  constructor(
    @InjectRepository(SpaceType)
    private readonly spaceTypeRepo: Repository<SpaceType>,
    @InjectRepository(SpaceTypeBrandMapper)
    private readonly spaceTypeBrandMapperRepo: Repository<SpaceTypeBrandMapper>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {
    super();
  }

  /**
   * Find all for space
   *
   * @param adminSpaceTypeListDto
   * @param pagination
   */
  async findAll(
    adminSpaceTypeListDto: AdminSpaceTypeListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<SpaceType>> {
    const qb = this.spaceTypeRepo
      .createQueryBuilder('spaceType')
      .AndWhereLike(
        'spaceType',
        'name',
        adminSpaceTypeListDto.name,
        adminSpaceTypeListDto.exclude('name'),
      )
      .AndWhereLike(
        'spaceType',
        'code',
        adminSpaceTypeListDto.code,
        adminSpaceTypeListDto.exclude('code'),
      )
      .WhereAndOrder(adminSpaceTypeListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   *
   * @param spaceTypeNo
   */
  async findOne(spaceTypeNo: number): Promise<SpaceType> {
    const spaceType = await this.spaceTypeRepo.findOne({
      where: { no: spaceTypeNo, delYn: YN.NO },
    });
    if (!spaceType) {
      throw new NotFoundException();
    }
    return spaceType;
  }

  /**
   * create space type for admin
   * @param adminSpaceTypeCreateDto
   */
  async create(
    adminSpaceTypeCreateDto: AdminSpaceTypeCreateDto,
  ): Promise<SpaceType> {
    let spaceType = new SpaceType(adminSpaceTypeCreateDto);
    spaceType = await this.spaceTypeRepo.save(spaceType);
    return spaceType;
  }

  /**
   * update space type
   * @param spaceTypeNo
   * @param adminSpaceTypeUpdateDto
   */
  async update(
    spaceTypeNo: number,
    adminSpaceTypeUpdateDto: AdminSpaceTypeUpdateDto,
  ): Promise<SpaceType> {
    const update = await this.spaceTypeRepo.findOne({
      where: { no: spaceTypeNo, delYn: YN.NO },
    });
    if (!update) {
      throw new NotFoundException();
    }
    const space = await this.entityManager.transaction(async entityManager => {
      let space = update.set(adminSpaceTypeUpdateDto);
      space = await entityManager.save(space);
      if (adminSpaceTypeUpdateDto.delYn === YN.YES) {
        //   delete mapper for brands
        await this.spaceTypeBrandMapperRepo
          .createQueryBuilder('spaceTypeBrandMapper')
          .delete()
          .where('spaceTypeBrandMapper.spaceTypeNo = :spaceTypeNo', {
            spaceTypeNo: space.no,
          })
          .execute();
        //   TODO: Space.spaceTypeNo 어케 하지??
      }
      return space;
    });
    return space;
  }
}
