import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from 'src/core';
import { MenuService } from './menu.service';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Menu } from './menu.entity';
import { AdminMenuListDto } from './dto';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';

@Controller()
@ApiBearerAuth()
@ApiTags('ADMIN MENU')
export class AdminMenuController extends BaseController {
  constructor(private readonly menuService: MenuService) {
    super();
  }

  /**
   * find all menus for admin
   * @param adminMenuListDto
   * @param pagination
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Get('/admin/menu')
  async findAll(
    @Query() adminMenuListDto: AdminMenuListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Menu>> {
    return await this.menuService.findAll(adminMenuListDto, pagination);
  }
}
