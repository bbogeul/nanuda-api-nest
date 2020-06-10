import {
  Controller,
  UseGuards,
  Get,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { BaseController } from 'src/core';
import { RevenueService } from './revenue.service';
import { AdminRevenueListDto } from './dto';
import { PaginatedResponse, PaginatedRequest } from 'src/common';
import { PaymentList } from '../dashboard/dashboard.entity';

@Controller()
@ApiTags('ADMIN REVENUE')
@ApiBearerAuth()
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
export class AdminRevenueController extends BaseController {
  constructor(private readonly revenueService: RevenueService) {
    super();
  }

  /**
   * find all revenue
   * @param adminRevenueListDto
   * @param pagination
   */
  @Get('/admin/revenue')
  async findAll(
    @Query() adminRevenueListDto: AdminRevenueListDto,
    @Query() pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<PaymentList>> {
    return await this.revenueService.findAll(adminRevenueListDto, pagination);
  }

  /**
   * find one revenue by id
   * @param revenueId
   */
  @Get('/admin/revenue/:id([0-9]+)')
  async findOne(
    @Param('id', ParseIntPipe) revenueId: number,
  ): Promise<PaymentList> {
    return await this.revenueService.findOne(revenueId);
  }
}
