import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from '../../core';
import { BrandService } from './brand.service';
import { BrandListDto } from './dto';
import { PaginatedRequest } from '../../common';
import { PaginatedResponse } from 'src/common';
import { Brand } from './brand.entity';

@Controller()
@ApiBearerAuth()
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
}
