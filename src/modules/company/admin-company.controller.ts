import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { BaseController } from 'src/core';
import { CompanyService } from './company.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { AdminCompanyListDto } from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Company } from './company.entity';

@ApiTags('ADMIN COMPANY')
@ApiBearerAuth()
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
@Controller()
export class AdminCompanyController extends BaseController {
  constructor(private readonly companyService: CompanyService) {
    super();
  }

  /**
   * find all for admin
   * @param adminCompanyListDto
   * @param pagination
   */
  @Get('/admin/company')
  async findAll(
    @Query() adminCompanyListDto: AdminCompanyListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Company>> {
    return await this.companyService.findAllForAdmin(
      adminCompanyListDto,
      pagination,
    );
  }
}
