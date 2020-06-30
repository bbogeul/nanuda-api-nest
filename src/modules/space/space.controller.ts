import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { BaseController } from 'src/core';
import { SpaceService } from './space.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SpaceListDto, SpaceCreateDto } from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Space } from './space.entity';

@Controller()
@ApiTags('NANUDA SPACE')
export class SpaceController extends BaseController {
  constructor(private readonly spaceService: SpaceService) {
    super();
  }

  /**
   * find for homepage
   * @param spaceListDto
   * @param pagination
   */
  @Get('/space')
  async findAll(
    @Query() spaceListDto: SpaceListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Space>> {
    return await this.spaceService.findForHomepage(spaceListDto, pagination);
  }

  /**
   * find one for homepage
   * @param spaceNo
   */
  @Get('/space/:id([0-9]+)')
  async findOne(@Param('id', ParseIntPipe) spaceNo: number): Promise<Space> {
    return await this.spaceService.findOneHomepage(spaceNo);
  }

  /**
   * create space for homepages
   * @param spaceCreateDto
   */
  @Post('/space')
  async create(@Body() spaceCreateDto: SpaceCreateDto): Promise<Space> {
    return await this.spaceService.createForHomepage(spaceCreateDto);
  }
}
