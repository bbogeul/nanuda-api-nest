import { Controller, Post, Body } from '@nestjs/common';
import { BaseController } from '../../core';
import { NanudaUserCreateDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { NanudaUserService } from './nanuda-user.service';
import { NanudaUser } from './nanuda-user.entity';

@Controller()
@ApiTags('NANUDA USER')
export class NanudaUserController extends BaseController {
  constructor(private readonly nanudaUserService: NanudaUserService) {
    super();
  }

  /**
   * create a new user
   * @param nanudaUserCreateDto
   */
  @Post('/nanuda-user')
  async create(
    @Body() nanudaUserCreateDto: NanudaUserCreateDto,
  ): Promise<NanudaUser> {
    return await this.nanudaUserService.create(nanudaUserCreateDto);
  }
}
