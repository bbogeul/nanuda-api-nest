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
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_ADMIN_USER } from 'src/shared';
import { BaseController } from 'src/core';
import { ProductConsultService } from './product-consult.service';
import {
  AdminProductConsultListDto,
  AdminProductConsultCreateDto,
  AdminProductConsultUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { ProductConsult } from './product-consult.entity';

@Controller()
@ApiTags('ADMIN PRODUCT CONSULT')
@ApiBearerAuth()
@UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
export class AdminProductConsultController extends BaseController {
  constructor(private readonly productConsultService: ProductConsultService) {
    super();
  }

  /**
   * get product consult for admin
   * @param adminProductConsultListDto
   * @param pagination
   */
  @Get('/admin/product-consult')
  async findAll(
    @Query() adminProductConsultListDto: AdminProductConsultListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<ProductConsult>> {
    return await this.productConsultService.findAll(
      adminProductConsultListDto,
      pagination,
    );
  }

  /**
   * find one for admin
   * @param id
   */
  @Get('/admin/product-consult/:id([0-9]+)')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductConsult> {
    return await this.productConsultService.findOne(id);
  }

  /**
   * create new product consult
   * @param adminProductConsultCreateDto
   */
  @Post('/admin/product-consult')
  async create(
    @Body() adminProductConsultCreateDto: AdminProductConsultCreateDto,
  ): Promise<ProductConsult> {
    return await this.productConsultService.create(
      adminProductConsultCreateDto,
    );
  }

  /**
   * update existing one
   * @param id
   * @param adminProductConsultUpdateDto
   */
  @Patch('/admin/product-consult/:id([0-9]+)')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() adminProductConsultUpdateDto: AdminProductConsultUpdateDto,
  ): Promise<ProductConsult> {
    return await this.productConsultService.update(
      id,
      adminProductConsultUpdateDto,
    );
  }

  /**
   * hard delete
   * @param id
   */
  @Delete('/admin/product-consult/:id([0-9]+)')
  async hardDelete(@Param('id', ParseIntPipe) id: number) {
    return { isDeleted: await this.productConsultService.hardDelete(id) };
  }
}
