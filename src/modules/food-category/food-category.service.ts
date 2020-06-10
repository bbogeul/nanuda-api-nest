import { Injectable } from '@nestjs/common';
import { BaseService, NanudaException } from 'src/core';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodCategory } from './food-category.entity';
import { Repository } from 'typeorm';
import {
  AdminFoodCategoryListDto,
  AdminFoodCategoryCreateDto,
  AdminFoodCategoryDeleteDto,
  AdminFoodCategoryListWithDeleteDto,
  AdminFoodCategoryUpdateDto,
} from './dto';
import {
  PaginatedRequest,
  PaginatedResponse,
  ORDER_BY_VALUE,
  YN,
} from 'src/common';

@Injectable()
export class FoodCategoryService extends BaseService {
  constructor(
    @InjectRepository(FoodCategory)
    private readonly foodCategoryRepo: Repository<FoodCategory>,
  ) {
    super();
  }

  /**
   * Find all with brands for food category without delete
   * @param adminFoodCategoryListDto
   * @param pagination
   */
  async findAll(
    adminFoodCategoryListDto: AdminFoodCategoryListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<FoodCategory>> {
    const qb = this.foodCategoryRepo
      .createQueryBuilder('FoodCategory')
      .CustomLeftJoinAndSelect(['brands'])
      .WhereAndOrder(adminFoodCategoryListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();

    return { items, totalCount };
  }

  /**
   * find all with delete for admin
   * @param adminFoodCategoryListWithDeleteDto
   * @param pagination
   */
  async findAllWithDelete(
    adminFoodCategoryListWithDeleteDto: AdminFoodCategoryListWithDeleteDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<FoodCategory>> {
    const qb = this.foodCategoryRepo
      .createQueryBuilder('FoodCategory')
      .CustomLeftJoinAndSelect(['brands'])
      .WhereAndOrder(adminFoodCategoryListWithDeleteDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();

    return { items, totalCount };
  }

  /**
   * get one for admin without delete
   * @param foodCategoryId
   */
  async findOne(foodCategoryId: number): Promise<FoodCategory> {
    const checkCategory = await this.foodCategoryRepo.findOne(foodCategoryId);
    if (!checkCategory) {
      throw new NanudaException('foodCategory.notFound');
    }
    const qb = this.foodCategoryRepo
      .createQueryBuilder('FoodCategory')
      .CustomLeftJoinAndSelect(['brands'])
      .where('FoodCategory.no = :no', { no: foodCategoryId })
      //   .andWhere('FoodCategory.delYn = :delYn', {delYn: YN.NO})
      .addOrderBy('brands.no', ORDER_BY_VALUE.DESC);

    return await qb.getOne();
  }

  /**
   * create new food category
   * @param adminId
   * @param adminFoodCategoryCreateDto
   */
  async create(
    adminId: number,
    adminFoodCategoryCreateDto: AdminFoodCategoryCreateDto,
  ): Promise<FoodCategory> {
    let foodCategory = new FoodCategory(adminFoodCategoryCreateDto);
    foodCategory.adminNo = adminId;
    foodCategory = await this.foodCategoryRepo.save(foodCategory);
    return foodCategory;
  }

  /**
   * Food category update by admin
   * @param adminId
   * @param foodCategoryId
   * @param adminFoodCategoryUpdateDto
   */
  async update(
    adminId: number,
    foodCategoryId: number,
    adminFoodCategoryUpdateDto: AdminFoodCategoryUpdateDto,
  ): Promise<FoodCategory> {
    let foodCategory = await this.foodCategoryRepo.findOne({
      where: {
        no: foodCategoryId,
        delYn: YN.NO,
      },
    });
    foodCategory = foodCategory.set(adminFoodCategoryUpdateDto);
    foodCategory.adminNo = adminId;
    return await this.foodCategoryRepo.save(foodCategory);
  }

  /**
   * soft delete food category
   * @param adminId
   * @param foodCategoryId
   * @param adminFoodCategoryDeleteDto
   */
  async softDelete(
    adminId: number,
    foodCategoryId: number,
    adminFoodCategoryDeleteDto: AdminFoodCategoryDeleteDto,
  ): Promise<FoodCategory> {
    if (adminFoodCategoryDeleteDto.delYn === YN.NO) {
      adminFoodCategoryDeleteDto.delYn = YN.YES;
    }
    let foodCategory = await this.foodCategoryRepo.findOne({
      where: { no: foodCategoryId, delYn: YN.NO },
    });
    if (!foodCategory) {
      throw new NanudaException('foodCategory.notFound');
    }
    foodCategory = foodCategory.set(adminFoodCategoryDeleteDto);
    foodCategory.adminNo = adminId;
    foodCategory = await this.foodCategoryRepo.save(foodCategory);
    return foodCategory;
  }

  /**
   * hard delete food category
   * TODO: 만약 카테고리 삭제 시 브랜드들도 삭제 할 필요가 있을까 고민
   * @param foodCategoryId
   */
  async hardDelete(foodCategoryId: number): Promise<boolean> {
    const qb = this.foodCategoryRepo
      .createQueryBuilder()
      .delete()
      .where('no = :no', { no: foodCategoryId })
      .execute();

    return true;
  }
}
