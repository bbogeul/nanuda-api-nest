import { Controller, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { BaseController } from '../../core';
import { NanudaUserCreateDto, NanudaUserUpdateDto } from './dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NanudaUserService } from './nanuda-user.service';
import { NanudaUser } from './nanuda-user.entity';
import { UserInfo } from 'src/common';
import { AuthRolesGuard } from 'src/core/guards';
import { NANUDA_USER } from 'src/shared';

@Controller()
@ApiTags('NANUDA USER')
@ApiBearerAuth()
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

  /**
   * update own information
   * @param nanudaUser
   * @param nanudaUserUpdateDto
   */
  @UseGuards(new AuthRolesGuard(NANUDA_USER.NORMAL_USER))
  @Patch('/nanuda-user')
  async update(
    @UserInfo() nanudaUser: NanudaUser,
    @Body() nanudaUserUpdateDto: NanudaUserUpdateDto,
  ) {
    return await this.nanudaUserService.update(
      nanudaUser.no,
      nanudaUserUpdateDto,
    );
  }
}
