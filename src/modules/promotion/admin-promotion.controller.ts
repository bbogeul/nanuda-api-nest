import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { BaseDto, BaseController } from 'src/core';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { UserInfo } from 'src/common';
import { Admin } from '../admin';
import { AdminPromotionCreateDto } from './dto';
import { Promotion } from './promotion.entity';
import { PromotionService } from './promotion.service';

@ApiBearerAuth()
@ApiTags('ADMIN PROMOTION')
@Controller()
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
export class AdminPromotion extends BaseController {
  constructor(private readonly promotionService: PromotionService) {
    super();
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
}
