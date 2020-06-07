import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { BaseController } from 'src/core';
import { ProductConsultService } from './product-consult.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthRolesGuard } from 'src/core/guards';
import { NANUDA_USER } from 'src/shared';
import { ProductConsultCreateDto } from './dto';
import { ProductConsult } from './product-consult.entity';
import { UserInfo } from 'src/common';
import { NanudaUser } from '../nanuda-user';

@Controller()
// @ApiBearerAuth()
@ApiTags('NANUDA PRODUCT CONSULT')
// @UseGuards(new AuthRolesGuard(NANUDA_USER.NORMAL_USER))
export class ProductConsultController extends BaseController {
  constructor(private readonly productConsultRepo: ProductConsultService) {
    super();
  }

  /**
   * create new product consult for nanuda user
   * @param nanudaUser
   * @param productConsultCreateDto
   */
  @Post('/product-consult')
  async create(
    @UserInfo() nanudaUser: NanudaUser,
    @Body() productConsultCreateDto: ProductConsultCreateDto,
  ): Promise<ProductConsult> {
    return await this.productConsultRepo.homePageCreate(
      nanudaUser.no,
      productConsultCreateDto,
    );
  }
}
