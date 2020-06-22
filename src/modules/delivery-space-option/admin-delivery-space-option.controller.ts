import {
  Controller,
  UseGuards,
  Get,
  Query,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { BaseController } from 'src/core';
import { DeliverySpaceOptionService } from './delivery-space-option.service';
import {
  AdminDeliverySpaceOptionListDto,
  AdminDeliverySpaceOptionCreateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse, UserInfo } from 'src/common';
import { DeliverySpaceOption } from './delivery-space-option.entity';
import { Admin } from '../admin';

@ApiBearerAuth()
@ApiTags('ADMIN DELIVERY SPACE OPTIONS')
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
@Controller()
export class AdminDeliverySpaceOptionController extends BaseController {
  constructor(
    private readonly deliverySpaceOptionService: DeliverySpaceOptionService,
  ) {
    super();
  }

  /**
   * find all options
   * @param adminDeliverySpaceOptionListDto
   * @param pagination
   */
  @Get('/admin/delivery-space-option')
  async findAll(
    @Query() adminDeliverySpaceOptionListDto: AdminDeliverySpaceOptionListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<DeliverySpaceOption>> {
    return await this.deliverySpaceOptionService.findAll(
      adminDeliverySpaceOptionListDto,
      pagination,
    );
  }

  /**
   * find one option
   * @param optionNo
   */
  @Get('/admin/delivery-space-option/:id([0-9]+)')
  async findOne(@Param('id') optionNo: number) {
    return await this.deliverySpaceOptionService.findOne(optionNo);
  }

  /**
   * create new option for admin
   * @param admin
   * @param adminDeliverySpaceOptionCreateDto
   */
  @Post('/admin/delivery-space-option')
  async create(
    @UserInfo() admin: Admin,
    @Body()
    adminDeliverySpaceOptionCreateDto: AdminDeliverySpaceOptionCreateDto,
  ): Promise<DeliverySpaceOption> {
    return await this.deliverySpaceOptionService.create(
      admin.no,
      adminDeliverySpaceOptionCreateDto,
    );
  }
}
