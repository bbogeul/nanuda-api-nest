import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { BaseController } from 'src/core';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { CONST_NANUDA_USER } from 'src/shared';
import { ProductListDto } from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Product } from './product.entity';

@Controller()
@ApiTags('NANUDA PRODUCT')
// @ApiBearerAuth()
// @UseGuards(new AuthRolesGuard(...CONST_NANUDA_USER))
export class ProductController extends BaseController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  /**
   * homepage product list
   * @param productListDto
   * @param pagination
   */
  @Get('/product-list')
  async findAll(
    @Query() productListDto: ProductListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Product>> {
    return await this.productService.homePageProduct(
      productListDto,
      pagination,
    );
  }
}
