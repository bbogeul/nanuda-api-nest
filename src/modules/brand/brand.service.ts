import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService, NanudaException } from 'src/core';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository, EntityManager } from 'typeorm';
import { AdminBrandListDto, AdminBrandCreateDto, BrandListDto } from './dto';
import {
  PaginatedRequest,
  PaginatedResponse,
  YN,
  ORDER_BY_VALUE,
} from 'src/common';
import { SpaceTypeBrandMapper } from '../space-type-brand-mapper/space-type-brand-mapper.entity';
import { FoodCategory } from '../food-category/food-category.entity';

@Injectable()
export class BrandService extends BaseService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
    @InjectRepository(FoodCategory)
    private readonly foodCategoryRepo: Repository<FoodCategory>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {
    super();
  }

  /**
   * create brand with mapping
   * TODO: image
   * @param adminBrandCreateDto
   * @param adminId
   */
  async newCreate(
    adminBrandCreateDto: AdminBrandCreateDto,
    adminId: number,
  ): Promise<Brand> {
    const brand = await this.entityManager.transaction(async entityManager => {
      // add admin id for adminNo
      adminBrandCreateDto.adminNo = adminId;
      let newBrand = new Brand(adminBrandCreateDto);
      if (adminBrandCreateDto.categoryNo) {
        const category = await this.foodCategoryRepo.findOne({
          where: {
            no: adminBrandCreateDto.categoryNo,
            delYn: YN.NO,
          },
        });
        if (!category) {
          // TODO: Change to nanuda exception
          throw new NotFoundException({ message: 'NO CATEGORY FOUND' });
        }
      }
      newBrand = await entityManager.save(newBrand);
      // create space type brand mapper
      if (
        adminBrandCreateDto.spaceTypeIds &&
        adminBrandCreateDto.spaceTypeIds.length > 0
      ) {
        adminBrandCreateDto.spaceTypeIds.map(async spaceTypeId => {
          const spaceTypeBrandMapper = new SpaceTypeBrandMapper();
          spaceTypeBrandMapper.brandNo = newBrand.no;
          spaceTypeBrandMapper.spaceTypeNo = parseInt(spaceTypeId, 10);
          spaceTypeBrandMapper.brandName = newBrand.nameKr;
          await entityManager.save(spaceTypeBrandMapper);
        });
      }
      return newBrand;
    });
    return brand;
  }

  /**
   * find all for admin (w/o soft delete)
   * @param adminBrandListDto
   * @param pagination
   */
  async findAll(
    adminBrandListDto: AdminBrandListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Brand>> {
    const qb = this.brandRepo
      .createQueryBuilder('brand')
      .select()
      .CustomLeftJoinAndSelect(['menus'])
      .AndWhereLike(
        'brand',
        'nameKr',
        adminBrandListDto.nameKr,
        adminBrandListDto.exclude('nameKr'),
      )
      .AndWhereLike(
        'brand',
        'nameEng',
        adminBrandListDto.nameEng,
        adminBrandListDto.exclude('nameEng'),
      )
      .WhereAndOrder(adminBrandListDto)
      .Paginate(pagination);

    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * find one brand for nanuda users
   * @param brandId
   */
  async findOne(brandId: number): Promise<Brand> {
    await this.__check_if_brand_exists_for_users(brandId);
    const qb = this.brandRepo
      .createQueryBuilder('brand')
      .select()
      .CustomLeftJoinAndSelect(['menus'])
      .addOrderBy('menus.no', ORDER_BY_VALUE.DESC)
      .where('brand.no = :no', { no: brandId })
      .andWhere('brand.delYn = :delYn', { delYn: YN.NO })
      .andWhere('brand.showYn = :showYn', { showYn: YN.YES });
    return await qb.getOne();
  }

  async findOneForAdmin(brandId: number): Promise<Brand> {
    return await this.__check_if_brand_exists_for_admins(brandId);
  }

  /**
   * find for homepage
   * @param brandListDto
   * @param pagination
   */
  async findForHomePage(
    brandListDto: BrandListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Brand>> {
    const qb = await this.brandRepo
      .createQueryBuilder('Brand')
      .CustomLeftJoinAndSelect(['menus'])
      .CustomInnerJoinAndSelect(['category'])
      .addSelect(['category.nameKr, category.nameEng'])
      .WhereAndOrder(brandListDto)
      .Paginate(pagination);
    await qb.getSql();
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  private async __check_if_brand_exists_for_users(brandId: number) {
    const brand = await this.brandRepo.findOne({
      where: {
        no: brandId,
        delYn: YN.NO,
        showYn: YN.YES,
      },
    });
    if (!brand) {
      throw new NanudaException('brand.notFound');
    }
    return brand;
  }

  private async __check_if_brand_exists_for_admins(brandId: number) {
    const brand = await this.brandRepo.findOne({
      where: {
        no: brandId,
        delYn: YN.NO,
      },
    });
    if (!brand) {
      throw new NanudaException('brand.notFound');
    }
    return brand;
  }
}
