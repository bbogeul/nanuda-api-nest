import { Injectable } from '@nestjs/common';
import { BaseService, NanudaException } from 'src/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { Repository } from 'typeorm';
import { AdminBrandListDto, AdminBrandCreateDto, BrandListDto } from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';

@Injectable()
export class BrandService extends BaseService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
  ) {
    super();
  }

  /**
   * create brand by admind
   * @param adminBrandCreateDto
   * @param adminId
   */
  async create(
    adminBrandCreateDto: AdminBrandCreateDto,
    adminId: number,
  ): Promise<Brand> {
    let brand = new Brand(adminBrandCreateDto);
    brand.adminNo = adminId;
    brand = await this.brandRepo.save(brand);
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
      .leftJoinAndSelect('brand.menus', 'menus')
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
      .AndWhereEqual(
        'brand',
        'showYn',
        adminBrandListDto.showYn,
        adminBrandListDto.exclude('showYn'),
      )
      .AndWhereEqual(
        'brand',
        'delYn',
        adminBrandListDto.delYn,
        adminBrandListDto.exclude('delYn'),
      )
      .AndWhereEqual(
        'brand',
        'spaceTypeNo',
        adminBrandListDto.spaceTypeNo,
        adminBrandListDto.exclude('spaceTypeNo'),
      )
      .AndWhereEqual(
        'brand',
        'categoryNo',
        adminBrandListDto.categoryNo,
        adminBrandListDto.exclude('categoryNo'),
      )
      .AndWhereEqual(
        'brand',
        'adminNo',
        adminBrandListDto.adminNo,
        adminBrandListDto.exclude('adminNo'),
      )
      .WhereAndOrder(adminBrandListDto)
      .Paginate(pagination);

    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * find one brand
   * @param brandId
   */
  async findOne(brandId: number): Promise<Brand> {
    await this.__check_if_brand_exists(brandId);
    return await this.brandRepo.findOne(brandId);
  }

  private async __check_if_brand_exists(brandId: number) {
    const brand = await this.brandRepo.findOne(brandId);
    if (!brand) {
      throw new NanudaException('brand.notFound');
    }
    return true;
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
      .leftJoinAndSelect('Brand.menus', 'menus')
      .AndWhereEqual(
        'Brand',
        'showYn',
        brandListDto.showYn,
        brandListDto.exclude('showYn'),
      )
      .WhereAndOrder(brandListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }
}
