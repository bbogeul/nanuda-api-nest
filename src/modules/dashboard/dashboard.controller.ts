import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/core';
import { DashboardService } from './dashboard.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';

@Controller()
@ApiTags('ADMIN DASHBOARD')
// @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
export class DashboardController extends BaseController {
  constructor(private readonly dashboardRepo: DashboardService) {
    super();
  }

  @Get('/admin/dashboard')
  async find() {
    return await this.dashboardRepo.findAll();
  }
}
