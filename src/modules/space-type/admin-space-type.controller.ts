import {
  Controller,
  UseGuards,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { BaseController } from 'src/core';
import { SpaceTypeService } from './space-type.service';
import {
  AdminSpaceTypeListDto,
  AdminSpaceTypeCreateDto,
  AdminSpaceTypeUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { SpaceType } from './space-type.entity';

@Controller()
@ApiBearerAuth()
@ApiTags('ADMIN SPACE TYPE')
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
export class AdminSpaceTypeController extends BaseController {
  constructor(private readonly spaceTypeService: SpaceTypeService) {
    super();
  }

  /**
   * find for space type
   * @param adminSpaceTypeListDto
   * @param pagination
   */
  @Get('/admin/space-type')
  async findAll(
    @Query() adminSpaceTypeListDto: AdminSpaceTypeListDto,
    @Query() pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<SpaceType>> {
    return await this.spaceTypeService.findAll(
      adminSpaceTypeListDto,
      pagination,
    );
  }

  /**
   * find one for space type
   * @param spaceTypeNo
   */
  @Get('/admin/space-type/:id([0-9]+)')
  async findOne(
    @Param('id', ParseIntPipe) spaceTypeNo: number,
  ): Promise<SpaceType> {
    return await this.spaceTypeService.findOne(spaceTypeNo);
  }

  /**
   * create space type
   * @param adminSpaceTypeCreateDto
   */
  @Post('/admin/space-type')
  async create(
    @Body() adminSpaceTypeCreateDto: AdminSpaceTypeCreateDto,
  ): Promise<SpaceType> {
    return await this.spaceTypeService.create(adminSpaceTypeCreateDto);
  }

  /**
   * update space type
   * @param spaceTypeNo
   * @param adminSpaceTypeUpdateDto
   */
  @Patch('/admin/space-type/:id([0-9]+)')
  async update(
    @Param('id', ParseIntPipe) spaceTypeNo: number,
    @Body() adminSpaceTypeUpdateDto: AdminSpaceTypeUpdateDto,
  ): Promise<SpaceType> {
    return await this.spaceTypeService.update(
      spaceTypeNo,
      adminSpaceTypeUpdateDto,
    );
  }
}
