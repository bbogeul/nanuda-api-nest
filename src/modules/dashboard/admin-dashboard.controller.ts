import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { BaseController } from 'src/core';
import { DashboardService } from './dashboard.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { AdminDashboardDayGraphDto } from './dto';

@Controller()
@ApiTags('ADMIN DASHBOARD')
// @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
export class AdminDashboardController extends BaseController {
  constructor(private readonly dashboardService: DashboardService) {
    super();
  }

  /**
   * day graph for dashboard
   * @param adminDashboardDayGraphDto
   */
  @Get('/admin-dashboard')
  async dayGraph(
    @Query() adminDashboardDayGraphDto: AdminDashboardDayGraphDto,
  ) {
    return await this.dashboardService.graphByDays(adminDashboardDayGraphDto);
  }
}
