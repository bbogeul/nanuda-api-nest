import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import {
  AdminSpaceListDto,
  AdminSpaceCreateDto,
  AdminSpaceUpdateDto,
  SpaceListDto,
  SpaceCreateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse, YN } from 'src/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Space } from './space.entity';
import { Repository, EntityManager } from 'typeorm';
import { SPACE_TYPE, SPACE, AMENITY } from 'src/shared';
import { SpaceBrandMapper } from '../space-brand-mapper/space-brand-mapper.entity';
import { CompanyDistrict } from '../company-district/company-district.entity';
import { CompanyDistrictSpaceMapper } from '../company-district-space-mapper/company-district-space-mapper.entity';
import { AmenitySpaceMapper } from '../amenity-space-mapper/amenity-space-mapper.entity';
import { DeliverySpaceOptionSpaceMapper } from '../delivery-space-option-space-mapper/delivery-space-option-space-mapper.entity';
import { PromotionSpaceMapper } from '../promotion-space-mapper/promotion-space-mapper.entity';
import { SpaceAnalysisSenderService } from './space-analysis-sender.service';

@Injectable()
export class SpaceService extends BaseService {
  constructor(
    private readonly spaceAnalysisSenderService: SpaceAnalysisSenderService,
    @InjectRepository(AmenitySpaceMapper)
    private readonly amenitySpaceMapperRepo: Repository<AmenitySpaceMapper>,
    @InjectRepository(CompanyDistrict)
    private readonly companyDistrictRepo: Repository<CompanyDistrict>,
    @InjectRepository(DeliverySpaceOptionSpaceMapper)
    private readonly deliverySpaceOptionSpaceMapperRepo: Repository<
      DeliverySpaceOptionSpaceMapper
    >,
    @InjectRepository(Space) private readonly spaceRepo: Repository<Space>,
    @InjectRepository(SpaceBrandMapper)
    private readonly spaceBrandMapperRepo: Repository<SpaceBrandMapper>,
    @InjectRepository(PromotionSpaceMapper)
    private readonly promotionSpaceMapperRepo: Repository<PromotionSpaceMapper>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
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
      .CustomLeftJoinAndSelect([
        'nanudaUser',
        'admin',
        'deliverySpaceOptions',
        'spaceType',
      ])
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
        'spaceType',
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

  /**
   * create new space for admin
   * @param adminSpaceCreateDto
   */
  async create(adminSpaceCreateDto: AdminSpaceCreateDto): Promise<Space> {
    const space = await this.entityManager.transaction(async entityManager => {
      let space = new Space(adminSpaceCreateDto);
      space = await entityManager.save(space);
      console.log(space);
      // space brand mapper
      if (
        adminSpaceCreateDto.brandListIds &&
        adminSpaceCreateDto.brandListIds.length > 0
      ) {
        await Promise.all(
          adminSpaceCreateDto.brandListIds.map(async brandNo => {
            let spaceBrandMapper = new SpaceBrandMapper();
            spaceBrandMapper.brandNo = brandNo;
            spaceBrandMapper.spaceNo = space.no;
            spaceBrandMapper.showYn = YN.YES;
            spaceBrandMapper = await entityManager.save(spaceBrandMapper);
          }),
        );
      }
      // company district mapper
      if (adminSpaceCreateDto.companyDistrictNo) {
        const checkDistrict = await this.companyDistrictRepo.findOne(
          adminSpaceCreateDto.companyDistrictNo,
        );
        if (!checkDistrict) {
          throw new NotFoundException();
        }
        let spaceDistrict = new CompanyDistrictSpaceMapper();
        spaceDistrict.companyDistrictNo = adminSpaceCreateDto.companyDistrictNo;
        spaceDistrict.spaceNo = space.no;
        spaceDistrict = await entityManager.save(spaceDistrict);
      }
      // amenity space mapper
      if (
        adminSpaceCreateDto.amenityIds &&
        adminSpaceCreateDto.amenityIds.length > 0
      ) {
        await Promise.all(
          adminSpaceCreateDto.amenityIds.map(async amenityNo => {
            let amenitySpaceMapper = new AmenitySpaceMapper();
            amenitySpaceMapper.amenityNo = amenityNo;
            amenitySpaceMapper.spaceNo = space.no;
            amenitySpaceMapper = await entityManager.save(amenitySpaceMapper);
          }),
        );
      }
      // delivery space option mapper
      if (
        adminSpaceCreateDto.spaceTypeNo == SPACE_TYPE.ONLY_DELIVERY &&
        adminSpaceCreateDto.deliverySpaceOptionsIds &&
        adminSpaceCreateDto.deliverySpaceOptionsIds.length > 0
      ) {
        await Promise.all(
          adminSpaceCreateDto.deliverySpaceOptionsIds.map(
            async deliverySpaceOptionNo => {
              let deliverySpaceOptionSpaceMapper = new DeliverySpaceOptionSpaceMapper();
              deliverySpaceOptionSpaceMapper.spaceNo = space.no;
              deliverySpaceOptionSpaceMapper.deliverySpaceOptionNo = deliverySpaceOptionNo;
              deliverySpaceOptionSpaceMapper = await entityManager.save(
                deliverySpaceOptionSpaceMapper,
              );
            },
          ),
        );
      }
      if (
        adminSpaceCreateDto.promotionIds &&
        adminSpaceCreateDto.promotionIds.length > 0
      ) {
        await Promise.all(
          adminSpaceCreateDto.promotionIds.map(async promotionNo => {
            let promotionSpaceMapper = new PromotionSpaceMapper();
            promotionSpaceMapper.promotionNo = promotionNo;
            promotionSpaceMapper.spaceNo = space.no;
            promotionSpaceMapper = await entityManager.save(
              promotionSpaceMapper,
            );
          }),
        );
      }
      // analysis info
      this.spaceAnalysisSenderService.setVicinityAnalysis(
        space.no,
        adminSpaceCreateDto.lat,
        adminSpaceCreateDto.lon,
      );
      return space;
    });
    return space;
  }

  /**
   * update space for admin
   * @param spaceNo
   * @param adminSpaceUpdateDto
   */
  async update(
    spaceNo: number,
    adminSpaceUpdateDto: AdminSpaceUpdateDto,
  ): Promise<Space> {
    const space = await this.entityManager.transaction(async entityManager => {
      let space = await this.spaceRepo.findOne(spaceNo);
      if (!space) {
        throw new NotFoundException();
      }
      space = space.set(adminSpaceUpdateDto);
      space = await entityManager.save(space);
      console.log(space);
      if (adminSpaceUpdateDto.lat) {
        this.spaceAnalysisSenderService.setVicinityAnalysis(
          space.no,
          adminSpaceUpdateDto.lat,
          adminSpaceUpdateDto.lon,
        );
      }
      if (adminSpaceUpdateDto.brandListIds) {
        await this.spaceBrandMapperRepo
          .createQueryBuilder('spaceBrandMapper')
          .delete()
          .where('spaceBrandMapper.spaceNo = :spaceNo', { spaceNo: space.no })
          .execute();

        if (adminSpaceUpdateDto.brandListIds.length > 0) {
          await Promise.all(
            adminSpaceUpdateDto.brandListIds.map(async brandNo => {
              let spaceBrandMapper = new SpaceBrandMapper();
              spaceBrandMapper.spaceNo = space.no;
              spaceBrandMapper.brandNo = brandNo;
              spaceBrandMapper = await entityManager.save(spaceBrandMapper);
            }),
          );
        }
      }

      if (adminSpaceUpdateDto.promotionIds) {
        await this.promotionSpaceMapperRepo
          .createQueryBuilder('promotionSpaceMapper')
          .delete()
          .where('spaceBrandMapper.spaceNo = :spaceNo', { spaceNo: space.no })
          .execute();

        if (adminSpaceUpdateDto.promotionIds.length > 0) {
          await Promise.all(
            adminSpaceUpdateDto.promotionIds.map(async promotionNo => {
              let promotionSpaceMapper = new PromotionSpaceMapper();
              promotionSpaceMapper.spaceNo = space.no;
              promotionSpaceMapper.promotionNo = promotionNo;
              promotionSpaceMapper = await entityManager.save(
                promotionSpaceMapper,
              );
            }),
          );
        }
      }
      if (adminSpaceUpdateDto.amenityIds) {
        await this.amenitySpaceMapperRepo
          .createQueryBuilder('amenitySpaceMapper')
          .delete()
          .where('amenitySpaceMapper.spaceNo = :spaceNo', { spaceNo: space.no })
          .execute();

        if (adminSpaceUpdateDto.amenityIds.length > 0) {
          await Promise.all(
            adminSpaceUpdateDto.amenityIds.map(async amenityNo => {
              let amenitySpaceMapper = new AmenitySpaceMapper();
              amenitySpaceMapper.spaceNo = space.no;
              amenitySpaceMapper.amenityNo = amenityNo;
              amenitySpaceMapper = await entityManager.save(amenitySpaceMapper);
            }),
          );
        }
      }
      if (adminSpaceUpdateDto.deliverySpaceOptionsIds) {
        await this.deliverySpaceOptionSpaceMapperRepo
          .createQueryBuilder('deliverySpaceOptionSpaceMapper')
          .delete()
          .where('deliverySpaceOptionSpaceMapper.spaceNo = :spaceNo', {
            spaceNo: space.no,
          })
          .execute();

        if (adminSpaceUpdateDto.deliverySpaceOptionsIds.length > 0) {
          await Promise.all(
            adminSpaceUpdateDto.deliverySpaceOptionsIds.map(
              async deliverySpaceOptionNo => {
                let deliverySpaceOptionSpaceMapper = new DeliverySpaceOptionSpaceMapper();
                deliverySpaceOptionSpaceMapper.spaceNo = space.no;
                deliverySpaceOptionSpaceMapper.deliverySpaceOptionNo = deliverySpaceOptionNo;
                deliverySpaceOptionSpaceMapper = await entityManager.save(
                  deliverySpaceOptionSpaceMapper,
                );
              },
            ),
          );
        }
      }
      return space;
    });
    return space;
  }

  /**
   * find for homepage
   * @param spaceListDto
   * @param pagination
   */
  async findForHomepage(
    spaceListDto: SpaceListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Space>> {
    const qb = this.spaceRepo
      .createQueryBuilder('space')
      .CustomInnerJoinAndSelect(['spaceType'])
      .AndWhereLike(
        'space',
        'name',
        spaceListDto.name,
        spaceListDto.exclude('name'),
      )
      .AndWhereLike(
        'space',
        'sigunguCode',
        spaceListDto.sigunguCode,
        spaceListDto.exclude('sigunguCode'),
      )
      .WhereAndOrder(spaceListDto)
      .Paginate(pagination);

    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * return one space
   * @param spaceNo
   */
  async findOneHomepage(spaceNo: number): Promise<Space> {
    const qb = await this.spaceRepo
      .createQueryBuilder('space')
      .CustomInnerJoinAndSelect(['spaceType'])
      .CustomLeftJoinAndSelect([
        'brands',
        'deliverySpaceOptions',
        'amenities',
        'promotions',
      ])
      .where('space.no = :no', { no: spaceNo })
      .andWhere('space.delYn = :delYn', { delYn: YN.NO })
      .andWhere('space.showYn = :showYn', { showYn: YN.YES })
      .getOne();
    if (!qb) {
      throw new NotFoundException();
    }
    return qb;
  }

  /**
   * create for nanuda user
   * @param spaceCreateDto
   */
  async createForHomepage(spaceCreateDto: SpaceCreateDto): Promise<Space> {
    const space = await this.entityManager.transaction(async entityManager => {
      let space = new Space(spaceCreateDto);
      space = await entityManager.save(space);
      if (spaceCreateDto.amenityIds && spaceCreateDto.amenityIds.length > 0) {
        await Promise.all(
          spaceCreateDto.amenityIds.map(async amenityNo => {
            let amenitySpaceMapper = new AmenitySpaceMapper();
            amenitySpaceMapper.amenityNo = amenityNo;
            amenitySpaceMapper.spaceNo = space.no;
            amenitySpaceMapper = await entityManager.save(amenitySpaceMapper);
          }),
        );
      }
      if (
        spaceCreateDto.deliverySpaceOptionsIds &&
        spaceCreateDto.deliverySpaceOptionsIds.length > 0
      ) {
        await Promise.all(
          spaceCreateDto.deliverySpaceOptionsIds.map(
            async deliverySpaceOptionNo => {
              let deliverySpaceOptionSpaceMapper = new DeliverySpaceOptionSpaceMapper();
              deliverySpaceOptionSpaceMapper.deliverySpaceOptionNo = deliverySpaceOptionNo;
              deliverySpaceOptionSpaceMapper.spaceNo = space.no;
              deliverySpaceOptionSpaceMapper = await entityManager.save(
                deliverySpaceOptionSpaceMapper,
              );
            },
          ),
        );
      }
      this.spaceAnalysisSenderService.setVicinityAnalysis(
        space.no,
        spaceCreateDto.lat,
        spaceCreateDto.lon,
      );
      return space;
    });
    return space;
  }
}
