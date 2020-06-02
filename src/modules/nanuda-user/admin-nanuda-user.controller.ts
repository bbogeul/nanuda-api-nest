import {
  Controller,
  UseGuards,
  Get,
  Query,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { BaseController } from '../../core';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from '../../core/guards';
import { CONST_ADMIN_USER, ADMIN_USER } from '../../shared';
import { NanudaUserService } from './nanuda-user.service';
import { AdminNanudaUserListDto, AdminNanudaUserDeleteDto } from './dto';
import { PaginatedRequest, PaginatedResponse } from '../../common';
import { NanudaUser } from '.';

@Controller()
@ApiBearerAuth()
@ApiTags('ADMIN NANUDA USER')
// @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
export class AdminNanudaUserController extends BaseController {
  constructor(private readonly nanudaUserService: NanudaUserService) {
    super();
  }

  /**
   * get users for admin
   * @param adminNanudaUserListDto
   * @param pagination
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Get('/admin/nanuda-user')
  async findAll(
    @Query() adminNanudaUserListDto: AdminNanudaUserListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<NanudaUser>> {
    return await this.nanudaUserService.findAll(
      adminNanudaUserListDto,
      pagination,
    );
  }

  /**
   * find one nanuda user for admin
   * @param nanudaUserId
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Get('/admin/nanuda-user/:id([0-9]+)')
  async findOne(@Param() nanudaUserId: number): Promise<NanudaUser> {
    return await this.nanudaUserService.findOne(nanudaUserId);
  }

  /**
   * soft delete nanuda user by admin
   * @param nanudaUserId
   * @param adminNanudaUserDeleteDto
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Delete('/admin/nanuda-user/:id([0-9]+)')
  async softDelete(
    @Param() nanudaUserId: number,
    @Body() adminNanudaUserDeleteDto: AdminNanudaUserDeleteDto,
  ) {
    return await this.nanudaUserService.softDelete(
      nanudaUserId,
      adminNanudaUserDeleteDto,
    );
  }

  /**
   * hard delete user
   * @param nanudaUserId
   */
  @UseGuards(new AuthRolesGuard(ADMIN_USER.SUPER))
  @Delete('/admin/nanuda-user/hard-delete/:id([0-9]+)')
  async hardDelete(@Param('id') nanudaUserId: number) {
    return { isDeleted: await this.nanudaUserService.hardDelete(nanudaUserId) };
  }
}
