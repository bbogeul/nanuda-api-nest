import {
  Controller,
  UseGuards,
  Query,
  Get,
  Param,
  Body,
  Post,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { BaseController } from 'src/core';
import { SpaceService } from './space.service';
import {
  AdminSpaceListDto,
  AdminSpaceCreateDto,
  AdminSpaceUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Space } from './space.entity';

@ApiTags('ADMIN SPACE')
@ApiBearerAuth()
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
@Controller()
export class AdminSpaceController extends BaseController {
  constructor(private readonly spaceService: SpaceService) {
    super();
  }

  /**
   * get space for admin
   * @param adminSpaceListDto
   * @param pagination
   */
  @Get('/admin/space')
  async findAll(
    @Query() adminSpaceListDto: AdminSpaceListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Space>> {
    return await this.spaceService.findAll(adminSpaceListDto, pagination);
  }

  /**
   * find one space for admin
   * @param spaceNo
   */
  @Get('/admin/space/:id([0-9]+)')
  async findOne(@Param('id') spaceNo: number): Promise<Space> {
    return await this.spaceService.findOne(spaceNo);
  }

  /**
   * create space for admin
   * @param adminSpaceCreateDto
   */
  @Post('/admin/space')
  async create(
    @Body() adminSpaceCreateDto: AdminSpaceCreateDto,
  ): Promise<Space> {
    return await this.spaceService.create(adminSpaceCreateDto);
  }

  /**
   * update space for admin
   * @param spaceNo
   * @param adminSpaceUpdateDto
   */
  @Patch('/admin/space/:id([0-9]+)')
  async update(
    @Param('id', ParseIntPipe) spaceNo: number,
    @Body() adminSpaceUpdateDto: AdminSpaceUpdateDto,
  ): Promise<Space> {
    return await this.update(spaceNo, adminSpaceUpdateDto);
  }
}
