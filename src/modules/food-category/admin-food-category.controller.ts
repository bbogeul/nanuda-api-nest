import { BaseController } from 'src/core';
import {
  Controller,
  UseGuards,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Delete,
  Body,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER, ADMIN_USER } from 'src/shared';
import {
  AdminFoodCategoryListDto,
  AdminFoodCategoryDeleteDto,
  AdminFoodCategoryListWithDeleteDto,
  AdminFoodCategoryCreateDto,
  AdminFoodCategoryUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse, UserInfo } from 'src/common';
import { FoodCategory } from './food-category.entity';
import { FoodCategoryService } from './food-category.service';
import { Admin } from '../admin';

@Controller()
@ApiBearerAuth()
@ApiTags('ADMIN FOOD CATEGORY')
export class AdminFoodCategoryController extends BaseController {
  constructor(private readonly foodCategoryService: FoodCategoryService) {
    super();
  }

  /**
   * create new food category
   * @param admin
   * @param adminFoodCategoryCreateDto
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Post('/admin/food-category')
  async create(
    @UserInfo() admin: Admin,
    @Body() adminFoodCategoryCreateDto: AdminFoodCategoryCreateDto,
  ): Promise<FoodCategory> {
    return await this.foodCategoryService.create(
      admin.no,
      adminFoodCategoryCreateDto,
    );
  }

  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Patch('/admin/food-category/:id([0-9])')
  async update(
    @UserInfo() admin: Admin,
    @Param('id', ParseIntPipe) foodCategoryId: number,
    @Body() adminFoodCategoryUpdateDto: AdminFoodCategoryUpdateDto,
  ): Promise<FoodCategory> {
    return await this.foodCategoryService.update(
      admin.no,
      foodCategoryId,
      adminFoodCategoryUpdateDto,
    );
  }

  /**
   * find all for admin
   * @param adminFoodCategoryListDto
   * @param pagination
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Get('/admin/food-category')
  async findAll(
    @Query() adminFoodCategoryListDto: AdminFoodCategoryListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<FoodCategory>> {
    return await this.foodCategoryService.findAll(
      adminFoodCategoryListDto,
      pagination,
    );
  }

  /**
   * find all for admin with delete
   * @param adminFoodCategoryListDto
   * @param pagination
   */
  @UseGuards(new AuthRolesGuard(ADMIN_USER.SUPER))
  @Get('/admin/food-category')
  async findAllWithDelete(
    @Query()
    adminFoodCategoryListWithDeleteDto: AdminFoodCategoryListWithDeleteDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<FoodCategory>> {
    return await this.foodCategoryService.findAll(
      adminFoodCategoryListWithDeleteDto,
      pagination,
    );
  }

  /**
   * find one for food category with brands
   * @param foodCategoryId
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Get('/admin/food-category/:id([0-9]+)')
  async findOne(
    @Param('id', ParseIntPipe) foodCategoryId: number,
  ): Promise<FoodCategory> {
    return await this.foodCategoryService.findOne(foodCategoryId);
  }

  /**
   * soft delete food category
   * @param admin
   * @param foodCategoryId
   * @param adminFoodCategoryDeleteDto
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Delete('/admin/food-category/:id([0-9]+)')
  async softDelete(
    @UserInfo() admin: Admin,
    @Param('id', ParseIntPipe) foodCategoryId: number,
    @Body() adminFoodCategoryDeleteDto: AdminFoodCategoryDeleteDto,
  ): Promise<FoodCategory> {
    return await this.foodCategoryService.softDelete(
      admin.no,
      foodCategoryId,
      adminFoodCategoryDeleteDto,
    );
  }

  /**
   * hard delete food category
   * @param foodCategoryId
   */
  @UseGuards(new AuthRolesGuard(ADMIN_USER.SUPER))
  @Delete('/admin/food-category/hard-delete/:id([0-9])')
  async hardDelete(@Param('id', ParseIntPipe) foodCategoryId: number) {
    return {
      isDeleted: await this.foodCategoryService.hardDelete(foodCategoryId),
    };
  }
}
