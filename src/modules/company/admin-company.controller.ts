import {
  Controller,
  Get,
  UseGuards,
  Query,
  Param,
  Post,
  Body,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { BaseController } from 'src/core';
import { CompanyService } from './company.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import {
  AdminCompanyListDto,
  AdminCompanyCreateDto,
  AdminCompanyUpdateDto,
  AdminCompanyDistrictCreateDto,
  AdminCompanyDistrictUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse, UserInfo } from 'src/common';
import { Company } from './company.entity';
import { Admin } from '../admin/admin.entity';
import { CompanyDistrict } from '../company-district/company-district.entity';

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

  /**
   * find one with company districts
   * @param companyNo
   * @param pagination
   */
  @Get('/admin/company/:id([0-9]+)')
  async findOne(
    @Param('id') companyNo: number,
    @Query() pagination: PaginatedRequest,
  ) {
    return await this.companyService.findOneForAdmin(companyNo, pagination);
  }

  /**
   * company district by company
   * @param companyNo
   * @param pagination
   */
  @Get('/admin/company/:id([0-9]+)/company-districts')
  async findAllDistrictsForCompany(
    @Param('id', ParseIntPipe) companyNo: number,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<CompanyDistrict>> {
    return await this.companyService.findAllDistrictsForCompany(
      companyNo,
      pagination,
    );
  }

  /**
   * find spaces by company
   * @param companyNo
   * @param pagination
   */
  @Get('/admin/company/:id([0-9]+)/spaces')
  async findSpacesByCompany(
    @Param('id') companyNo: number,
    @Query() pagination: PaginatedRequest,
  ) {
    return await this.companyService.findSpaceByCompany(companyNo, pagination);
  }

  /**
   * create new company
   * @param adminCompanyCreateDto
   * @param admin
   */
  @Post('/admin/company')
  async create(
    @Body() adminCompanyCreateDto: AdminCompanyCreateDto,
    @UserInfo() admin: Admin,
  ): Promise<Company> {
    return await this.companyService.create(adminCompanyCreateDto, admin.no);
  }

  /**
   * create new company district
   * @param companyNo
   * @param adminCompanyDistrictDto
   */
  @Post('/admin/company/:id([0-9]+)/company-district')
  async createDistrict(
    @Param('id', ParseIntPipe) companyNo: number,
    @Body() adminCompanyDistrictDto: AdminCompanyDistrictCreateDto,
  ): Promise<CompanyDistrict> {
    return await this.companyService.createDistrict(
      companyNo,
      adminCompanyDistrictDto,
    );
  }

  /**
   * update existing district
   * @param companyNo
   * @param companyDistrictNo
   * @param adminCompanyDistrictUpdateDto
   */
  @Patch('/admin/company/:id([0-9]+)/company-district/:districtId([0-9]+)')
  async updateDistrict(
    @Param('id', ParseIntPipe) companyNo: number,
    @Param('districtId', ParseIntPipe) companyDistrictNo: number,
    @Body() adminCompanyDistrictUpdateDto: AdminCompanyDistrictUpdateDto,
  ): Promise<CompanyDistrict> {
    return await this.companyService.updateDistrict(
      companyNo,
      companyDistrictNo,
      adminCompanyDistrictUpdateDto,
    );
  }

  /**
   * update company
   * @param adminCompanyUpdateDto
   * @param companyNo
   * @param admin
   */
  @Patch('/admin/company/:id([0-9]+)')
  async update(
    @Body() adminCompanyUpdateDto: AdminCompanyUpdateDto,
    @Param('id', ParseIntPipe) companyNo: number,
    @UserInfo() admin: Admin,
  ): Promise<Company> {
    return await this.companyService.update(
      companyNo,
      adminCompanyUpdateDto,
      admin.no,
    );
  }
}
