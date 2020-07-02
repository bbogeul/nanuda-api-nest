import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService, NanudaException } from 'src/core';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository, EntityManager } from 'typeorm';
import {
  AdminBrandListDto,
  AdminBrandCreateDto,
  BrandListDto,
  AdminBrandUpdateDto,
} from './dto';
import {
  PaginatedRequest,
  PaginatedResponse,
  YN,
  ORDER_BY_VALUE,
} from 'src/common';
import { SpaceTypeBrandMapper } from '../space-type-brand-mapper/space-type-brand-mapper.entity';
import { FoodCategory } from '../food-category/food-category.entity';
import { SpaceType } from '../space-type/space-type.entity';

@Injectable()
export class BrandService extends BaseService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
    @InjectRepository(FoodCategory)
    private readonly foodCategoryRepo: Repository<FoodCategory>,
    @InjectRepository(SpaceTypeBrandMapper)
    private readonly spaceTypeBrandMapperRepo: Repository<SpaceTypeBrandMapper>,
    @InjectRepository(SpaceType)
    private readonly spaceTypeRepo: Repository<SpaceType>,
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
  async create(
    adminBrandCreateDto: AdminBrandCreateDto,
    adminId: number,
  ): Promise<Brand> {
    const brand = await this.entityManager.transaction(async entityManager => {
      // add admin id for adminNo
      adminBrandCreateDto.adminNo = adminId;
      let brand = new Brand(adminBrandCreateDto);
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
      brand = await entityManager.save(brand);
      // create space type brand mapper
      if (
        adminBrandCreateDto.spaceTypeIds &&
        adminBrandCreateDto.spaceTypeIds.length > 0
      ) {
        await Promise.all(
          adminBrandCreateDto.spaceTypeIds.map(async spaceTypeId => {
            const spaceTypeBrandMapper = new SpaceTypeBrandMapper();
            spaceTypeBrandMapper.brandNo = brand.no;
            spaceTypeBrandMapper.spaceTypeNo = parseInt(spaceTypeId, 10);
            spaceTypeBrandMapper.brandName = brand.nameKr;
            await entityManager.save(spaceTypeBrandMapper);
          }),
        );
      }
      return brand;
    });
    return brand;
  }

  /**
   * update for brand with mapper
   * @param brandId
   * @param adminId
   * @param adminBrandUpdateDto
   */
  async update(
    brandId: number,
    adminId: number,
    adminBrandUpdateDto: AdminBrandUpdateDto,
  ): Promise<Brand> {
    const brand = await this.entityManager.transaction(async entityManager => {
      let brand = await this.brandRepo.findOne({
        where: { no: brandId, delYn: YN.NO },
      });
      if (!brand) {
        throw new NotFoundException('NO BRAND');
      }
      if (
        adminBrandUpdateDto.categoryNo &&
        adminBrandUpdateDto.categoryNo !== 0
      ) {
        const category = await this.foodCategoryRepo.findOne(
          adminBrandUpdateDto.categoryNo,
        );
        if (!category) {
          // TODO: Change to nanuda exception
          throw new NotFoundException({ message: 'NO CATEGORY FOUND' });
        }
      }
      brand = brand.set(adminBrandUpdateDto);
      brand.adminNo = adminId;
      brand = await entityManager.save(brand);
      if (
        adminBrandUpdateDto.spaceTypeIds &&
        adminBrandUpdateDto.spaceTypeIds.length > 0
      ) {
        // first destroy mappers
        await this.spaceTypeBrandMapperRepo
          .createQueryBuilder('mapperBrand')
          .delete()
          .where('mapperBrand.brandNo = :brandNo', { brandNo: brandId })
          .execute();
        // then create new
        adminBrandUpdateDto.spaceTypeIds.map(async spaceTypeId => {
          const spaceTypeBrandMapper = new SpaceTypeBrandMapper();
          spaceTypeBrandMapper.brandName = brand.nameKr;
          spaceTypeBrandMapper.brandNo = brand.no;
          spaceTypeBrandMapper.spaceTypeNo = parseInt(spaceTypeId, 10);
          await entityManager.save(spaceTypeBrandMapper);
        });
      }
      return brand;
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
      .CustomLeftJoinAndSelect(['menus', 'category'])
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
      .CustomLeftJoinAndSelect(['menus', 'category', 'spaceTypes'])
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

  /**
   * find brand by category
   * @param foodCategoryNo
   * @param brandListDto
   * @param pagination
   */
  async findBrandByCategory(
    foodCategoryNo: number,
    brandListDo: AdminBrandListDto | BrandListDto,
    pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Brand>> {
    const category = await this.foodCategoryRepo.findOne(foodCategoryNo);
    if (!category) {
      throw new NotFoundException('CATEGORY NOT FOUND');
    }
    const qb = this.brandRepo
      .createQueryBuilder('brand')
      .CustomInnerJoinAndSelect(['category'])
      .where('brand.categoryNo = :categoryNo', { categoryNo: foodCategoryNo })
      .WhereAndOrder(brandListDo)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * get all brands under one space type
   * @param spaceTypeNo
   * @param brandListDto
   * @param pagination
   */
  async findBySpaceType(
    spaceTypeNo: number,
    brandListDto?: AdminBrandListDto | BrandListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Brand>> {
    const qb = this.brandRepo
      .createQueryBuilder('brand')
      .CustomInnerJoinAndSelect(['category'])
      .innerJoin('brand.spaceTypes', 'spaceTypes')
      .where('spaceTypes.no = :no', { no: spaceTypeNo })
      .WhereAndOrder(brandListDto)
      .Paginate(pagination);
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
