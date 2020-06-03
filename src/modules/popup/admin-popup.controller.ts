import {
  Controller,
  UseGuards,
  Query,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/core';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER, ADMIN_USER } from 'src/shared';
import {
  AdminPopupListDto,
  AdminPopupCreateDto,
  AdminPopupDeleteDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Popup } from './popup.entity';
import { PopupService } from './popup.service';

@Controller()
@ApiBearerAuth()
@ApiTags('ADMIN POPUP')
export class AdminPopupController extends BaseController {
  constructor(private readonly popupService: PopupService) {
    super();
  }

  /**
   * find all popup for admin
   * @param adminPopupListDto
   * @param pagination
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Get('/admin/popup')
  async findAll(
    @Query() adminPopupListDto: AdminPopupListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Popup>> {
    return await this.popupService.findAll(adminPopupListDto, pagination);
  }

  /**
   * find with soft delete
   * ACL: SUPER ADMIN only
   * @param pagination
   */
  @UseGuards(new AuthRolesGuard(ADMIN_USER.SUPER))
  @Get('/admin/with-delete')
  async findWithSoftDelete(
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Popup>> {
    return await this.popupService.findWithSoftDelete(pagination);
  }

  /**
   * find one with soft delete
   * @param popupId
   */
  @UseGuards(new AuthRolesGuard(ADMIN_USER.SUPER))
  @Get('/admin/with-delete/:id([0-9]+)')
  async findOneWithSoftDelete(
    @Param('id', ParseIntPipe) popupId: number,
  ): Promise<Popup> {
    return await this.popupService.findOneWithSoftDelete(popupId);
  }

  /**
   * create new popup by admin
   * @param adminPopupCreateDto
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Post('/admin/popup')
  async create(
    @Body() adminPopupCreateDto: AdminPopupCreateDto,
  ): Promise<Popup> {
    return await this.popupService.create(adminPopupCreateDto);
  }

  /**
   * soft delete popup for admin
   * @param popupId
   * @param adminPopupDeleteDto
   */
  @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
  @Delete('/admin/popup/:id([0-9]+)')
  async softDelete(
    @Param('id', ParseIntPipe) popupId: number,
    @Body() adminPopupDeleteDto: AdminPopupDeleteDto,
  ): Promise<Popup> {
    return await this.popupService.softDelete(popupId, adminPopupDeleteDto);
  }

  /**
   * hard delete for admin
   * @param popupId
   */
  @UseGuards(new AuthRolesGuard(ADMIN_USER.SUPER))
  @Delete('/admin/popup//hard-delete/:id([0-9]+)')
  async hardDelete(@Param('id', ParseIntPipe) popupId: number) {
    return await this.popupService.hardDelete(popupId);
  }
}
