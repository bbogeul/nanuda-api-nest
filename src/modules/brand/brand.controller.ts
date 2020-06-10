import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core';
import { BrandService } from './brand.service';
import { BrandListDto } from './dto';
import { PaginatedRequest } from '../../common';
import { PaginatedResponse } from 'src/common';
import { Brand } from './brand.entity';

@Controller()
// @ApiBearerAuth()
@ApiTags('NANUDA BRAND')
export class BrandController extends BaseController {
  constructor(private readonly brandService: BrandService) {
    super();
  }

  /**
   * get for homepage
   * @param brandListDto
   * @param pagination
   */
  @Get('/brand')
  async findAll(
    @Query() brandListDto: BrandListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Brand>> {
    return await this.brandService.findForHomePage(brandListDto, pagination);
  }

  /**
   * get brand detail for homepage
   * @param brandId
   */
  @Get('/brand/:id([0-9]+)')
  async findOne(@Param('id', ParseIntPipe) brandId: number): Promise<Brand> {
    return await this.brandService.findOne(brandId);
  }

  // /**
  //  * find brand by category
  //  * @param foodCategoryNo
  //  * @param brandListDto
  //  * @param pagination
  //  */
  // @Get('/brand/food-category/:id([0-9]+)')
  // async findByCategory(
  //   @Param('id', ParseIntPipe) foodCategoryNo: number,
  //   @Query() brandListDto: BrandListDto,
  //   @Query() pagination: PaginatedRequest,
  // ): Promise<PaginatedResponse<Brand>> {
  //   return await this.brandService.findBrandByCategory(
  //     foodCategoryNo,
  //     brandListDto,
  //     pagination,
  //   );
  // }
}
