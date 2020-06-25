import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { BaseDto, BaseController } from 'src/core';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { UserInfo, PaginatedRequest, PaginatedResponse } from 'src/common';
import { Admin } from '../admin';
import {
  AdminPromotionCreateDto,
  AdminPromotionListDto,
  AdminPromotionUpdateDto,
} from './dto';
import { Promotion } from './promotion.entity';
import { PromotionService } from './promotion.service';

@Controller()
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
@ApiBearerAuth()
@ApiTags('ADMIN PROMOTION')
export class AdminPromotionController extends BaseController {
  constructor(private readonly promotionService: PromotionService) {
    super();
  }

  /**
   * find all for promotion
   * @param adminPromotionListDto
   * @param pagination
   */
  @Get('/admin/promotion')
  async findAll(
    @Query() adminPromotionListDto: AdminPromotionListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Promotion>> {
    return await this.promotionService.findAll(
      adminPromotionListDto,
      pagination,
    );
  }
  /**
   * find one for admin
   * @param promotionNo
   */
  @Get('/admin/promotion/:id([0-9]+)')
  async findOne(@Param('id') promotionNo: number): Promise<Promotion> {
    return await this.promotionService.findOne(promotionNo);
  }

  /**
   * create promotion for admin
   * @param admin
   * @param adminPromotionCreateDto
   */
  @Post('/admin/promotion')
  async create(
    @UserInfo() admin: Admin,
    @Body() adminPromotionCreateDto: AdminPromotionCreateDto,
  ): Promise<Promotion> {
    return await this.promotionService.create(
      admin.no,
      adminPromotionCreateDto,
    );
  }

  /**
   * update existing promotion
   * @param promotionNo
   * @param admin
   * @param adminPromotionUpdateDto
   */
  @Patch('/admin/promotion/:id([0-9]+)')
  async update(
    @Param('id') promotionNo: number,
    @UserInfo() admin: Admin,
    @Body() adminPromotionUpdateDto: AdminPromotionUpdateDto,
  ): Promise<Promotion> {
    return await this.promotionService.update(
      admin.no,
      promotionNo,
      adminPromotionUpdateDto,
    );
  }
}
