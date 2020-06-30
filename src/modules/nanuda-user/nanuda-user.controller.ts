import { Controller, Post, Body, UseGuards, Patch, Req } from '@nestjs/common';
import { BaseController } from '../../core';
import {
  NanudaUserCreateDto,
  NanudaUserUpdateDto,
  NanudaUserGetAuthDto,
} from './dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NanudaUserService } from './nanuda-user.service';
import { NanudaUser } from './nanuda-user.entity';
import { UserInfo } from 'src/common';
import { AuthRolesGuard } from 'src/core/guards';
import { NANUDA_USER } from 'src/shared';
import { Request } from 'express';

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

  /**
   * get auth code for logging in
   * @param req
   * @param nanudaUserGetAuthDto
   */
  @Post('/get-auth-code')
  async getAuth(
    @Req() req: Request,
    @Body() nanudaUserGetAuthDto: NanudaUserGetAuthDto,
  ): Promise<any> {
    return await this.nanudaUserService.getAuthCode(req, nanudaUserGetAuthDto);
  }
}
