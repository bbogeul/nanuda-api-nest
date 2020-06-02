import { Controller, UseGuards, Query, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/core';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { AdminPopupListDto } from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Popup } from './popup.entity';
import { PopupService } from './popup.service';

@Controller()
@ApiBearerAuth()
@ApiTags('ADMIN Popup')
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
export class AdminPopupController extends BaseController {
  constructor(private readonly popupService: PopupService) {
    super();
  }

  /**
   * find all popup for admin
   * @param adminPopupListDto
   * @param pagination
   */
  @Get('/admin/popup')
  async findAll(
    @Query() adminPopupListDto: AdminPopupListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Popup>> {
    return await this.popupService.findAll(adminPopupListDto, pagination);
  }
}
