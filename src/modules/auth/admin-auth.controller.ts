import { Controller, Post, Body } from '@nestjs/common';
import { BaseController } from '../../core';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto';
import { Auth } from './types';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from '../admin';
import { Repository } from 'typeorm';

@Controller()
@ApiTags('ADMIN Auth')
export class AdminAuthController extends BaseController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
  ) {
    super();
  }

  /**
   * admin login
   * @param adminLoginDto
   */
  @ApiOperation({
    description: '관리자 로그인',
  })
  @Post('/auth/admin/login')
  async login(@Body() adminLoginDto: AdminLoginDto): Promise<Auth> {
    return await this.authService.adminLogin(adminLoginDto);
  }

  // TODO: Change password 기능
}
