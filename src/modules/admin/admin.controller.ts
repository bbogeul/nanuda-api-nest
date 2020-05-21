import {
  Controller,
  Get,
  UseGuards,
  Query,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { BaseController } from 'src/core';
import { AdminListDto, AdminCreateDto, AdminUpdateDto } from './dto';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER, ADMIN_USER } from 'src/shared';
import { PaginatedRequest, PaginatedResponse, UserInfo } from 'src/common';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';

@ApiTags('ADMIN')
@ApiBearerAuth()
@Controller()
export class AdminController extends BaseController {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  /**
   * admin list
   * @param adminListDto
   * @param pagination
   */
  @ApiOperation({})
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Get('/admin')
  async findAll(
    @Query() adminListDto: AdminListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Admin>> {
    return await this.adminService.findAll(adminListDto, pagination);
  }

  /**
   * Admin find one
   * @param id
   */
  @ApiOperation({})
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Get('/admin/:id([0-9]+)')
  async findOne(@Param('id', ParseIntPipe) adminId: number): Promise<Admin> {
    return await this.adminService.findOne(adminId);
  }

  /**
   * create admin
   * @param adminCreateDto
   */
  @ApiOperation({
    description: '관리자가 새로운 관리자 등록',
  })
  @Post('/admin')
  @UseGuards(new AuthRolesGuard(ADMIN_USER.SUPER))
  async create(@Body() adminCreateDto: AdminCreateDto): Promise<Admin> {
    return await this.adminService.create(adminCreateDto);
  }

  /**
   * create admin
   * @param adminCreateDto
   */
  @ApiOperation({
    description: '관리자 본인 등록',
  })
  @Post('/admin/register')
  async register(@Body() adminCreateDto: AdminCreateDto): Promise<Admin> {
    return await this.adminService.create(adminCreateDto);
  }

  /**
   * admin soft delete
   * @param adminId
   */
  @ApiOperation({})
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Delete('/admin/:id([0-9]+)')
  async delete(@Param('id', ParseIntPipe) adminId: number): Promise<Admin> {
    return await this.adminService.delete(adminId);
  }

  /**
   * admin self update
   * @param admin
   * @param id
   * @param adminUpdateDto
   */
  @ApiOperation({})
  @Patch('/admin/:id([0-9]+)')
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  async selfUpdate(
    @UserInfo() admin: Admin,
    @Param('id', ParseIntPipe) id: number,
    @Body() adminUpdateDto: AdminUpdateDto,
  ): Promise<Admin> {
    return await this.adminService.update(admin, id, adminUpdateDto);
  }
}
