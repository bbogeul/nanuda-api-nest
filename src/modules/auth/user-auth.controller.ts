import { Controller, Post, Body } from '@nestjs/common';
import { BaseController } from '../../core';
import { AuthService } from './auth.service';
import { NanudaUserLoginDto } from './dto';
import { Auth } from '.';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('AUTH NANUDA USER')
export class UserAuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }
  /**
   * login for regular user
   * @param nanudaUserLoginDto
   */
  @Post('/nanuda-user/login')
  async login(@Body() nanudaUserLoginDto: NanudaUserLoginDto): Promise<Auth> {
    return await this.authService.nanudaUserLogin(nanudaUserLoginDto);
  }
}
