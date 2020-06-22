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
import { BaseController } from 'src/core';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { AmenityService } from './amenity.service';
import {
  AdminAmenityListDto,
  AdminAmenityCreateDto,
  AdminAmenityUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Amenity } from './amenity.entity';

@Controller()
@ApiBearerAuth()
@ApiTags('ADMIN AMENITY')
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
export class AdminAmenityController extends BaseController {
  constructor(private readonly amenityService: AmenityService) {
    super();
  }

  /**
   * find all for admin
   * @param adminAmenitListDto
   * @param pagination
   */
  @Get('/admin/amenity')
  async findAll(
    @Query() adminAmenitListDto: AdminAmenityListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Amenity>> {
    return await this.amenityService.findAll(adminAmenitListDto, pagination);
  }

  /**
   * find one for admin
   * @param amenityNo
   */
  @Get('/admin/amenity/:id([0-9]+)')
  async findOne(
    @Param('id', ParseIntPipe) amenityNo: number,
  ): Promise<Amenity> {
    return await this.amenityService.findOne(amenityNo);
  }

  /**
   * create for admin
   * @param adminAmenityCreateDto
   */
  @Post('/admin/amenity')
  async create(
    @Body() adminAmenityCreateDto: AdminAmenityCreateDto,
  ): Promise<Amenity> {
    return await this.amenityService.create(adminAmenityCreateDto);
  }

  /**
   * update amenity for admin
   * @param amenityNo
   * @param adminAmenityUpdateDto
   */
  @Patch('/admin/amenity/:id([0-9]+)')
  async update(
    @Param('id', ParseIntPipe) amenityNo: number,
    @Body() adminAmenityUpdateDto: AdminAmenityUpdateDto,
  ): Promise<Amenity> {
    return await this.amenityService.update(amenityNo, adminAmenityUpdateDto);
  }
}
