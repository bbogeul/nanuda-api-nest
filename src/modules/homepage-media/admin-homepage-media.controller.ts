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
import { HomepageMediaService } from './homepage-media.service';
import { AdminHomepageMediaListDto } from './dto/admin-homepage-media-list.dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { HomepageMedia } from './homepage-media.entity';
import {
  AdminHomepageMediaCreateDto,
  AdminHomepageMediaUpdateDto,
} from './dto';

@Controller()
@ApiBearerAuth()
@ApiTags('ADMIN HOMEPAGE MEDIA')
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
export class AdminHomepageMediaController extends BaseController {
  constructor(private readonly homepageMediaService: HomepageMediaService) {
    super();
  }

  /**
   * admin homepage media list
   * @param adminHomepageMediaListDto
   * @param pagination
   */
  @Get('/admin/homepage-media')
  async findAll(
    @Query() adminHomepageMediaListDto: AdminHomepageMediaListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<HomepageMedia>> {
    return await this.homepageMediaService.findAll(
      adminHomepageMediaListDto,
      pagination,
    );
  }

  /**
   * find one for admin
   * @param homepageMediaNo
   */
  @Get('/admin/homepage-media/:id([0-9]+)')
  async findOne(
    @Param('id', ParseIntPipe) homepageMediaNo: number,
  ): Promise<HomepageMedia> {
    return await this.homepageMediaService.findOne(homepageMediaNo);
  }

  /**
   * create for homepage
   * @param adminHomepageCreateDto
   */
  @Post('/admin/homepage-media')
  async create(
    @Body() adminHomepageCreateDto: AdminHomepageMediaCreateDto,
  ): Promise<HomepageMedia> {
    return await this.homepageMediaService.create(adminHomepageCreateDto);
  }

  /**
   * update for admin
   * @param homepageMediaNo
   * @param adminHomepageMediaUpdateDto
   */
  @Patch('/admin/homepage-media/:id([0-9]+)')
  async update(
    @Param('id', ParseIntPipe) homepageMediaNo: number,
    @Body() adminHomepageMediaUpdateDto: AdminHomepageMediaUpdateDto,
  ): Promise<HomepageMedia> {
    return await this.homepageMediaService.update(
      homepageMediaNo,
      adminHomepageMediaUpdateDto,
    );
  }
}
