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
import { ProductService } from './product.service';
import {
  AdminProductListDto,
  AdminProductCreateDto,
  AdminProductUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Product } from './product.entity';

// @ApiBearerAuth()
@ApiTags('ADMIN PRODUCT')
// @UseGuards(new AuthRolesGuard(...CONST_ADMIN_USER))
@Controller()
export class AdminProductController extends BaseController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  /**
   * find all products
   * @param adminProductListDto
   * @param pagination
   */
  @Get('/admin/product')
  async findAll(
    @Query() adminProductListDto: AdminProductListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Product>> {
    return await this.productService.findAll(adminProductListDto, pagination);
  }

  /**
   * find one product
   * @param productId
   */
  @Get('/admin/product/:id([0-9]+)')
  async findOne(
    @Param('id', ParseIntPipe) productId: number,
  ): Promise<Product> {
    return await this.productService.findOne(productId);
  }

  /**
   * create new product
   * @param adminProductCreateDto
   */
  @Post('/admin/product')
  async create(
    @Body() adminProductCreateDto: AdminProductCreateDto,
  ): Promise<Product> {
    return await this.productService.create(adminProductCreateDto);
  }

  /**
   * update product
   * @param productId
   * @param adminProductUpdateDto
   */
  @Patch('/admin/product/:id([0-9]+)')
  async update(
    @Param('id', ParseIntPipe) productId: number,
    @Body() adminProductUpdateDto: AdminProductUpdateDto,
  ): Promise<Product> {
    return await this.productService.update(productId, adminProductUpdateDto);
  }
}
