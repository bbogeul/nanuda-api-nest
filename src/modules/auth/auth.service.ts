import { BaseService, NanudaException } from '../../core';
import { Injectable } from '@nestjs/common';
import { PasswordService } from './password.service';
import { Admin } from '../admin';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserSigninPayload, UserType, Auth } from './types';
import { NanudaUser } from '../nanuda-user';
import { AdminLoginDto, NanudaUserLoginDto } from './dto';
import { YN } from '../../common';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    @InjectRepository(NanudaUser)
    private readonly nanudaUserRepo: Repository<NanudaUser>,
    @InjectRepository(Admin)
    private readonly adminRepo: Repository<Admin>,
  ) {
    super();
  }
  /**
   * Login for admin
   * @param adminLoginDto
   */
  async adminLogin(adminLoginDto: AdminLoginDto): Promise<Auth> {
    const admin = await this.adminRepo.findOne({
      phone: adminLoginDto.phone,
      delYN: YN.NO,
    });
    if (!admin) {
      throw new NanudaException('auth.notFound');
    }
    if (admin.adminYN !== YN.YES) {
      throw new NanudaException('auth.notAvailable');
    }
    // const passwordValid = await this.passwordService.validatePassword(
    //   adminLoginDto.password,
    //   admin.password,
    // );
    // TODO: login 정책 정하기
    // if (!passwordValid) {
    //   throw new Error();
    // }
    const token = await this.sign(admin);
    const user = new Auth();
    user.token = token;
    user.user = admin;
    return user;
  }

  /**
   * Login for Nanuda  user
   */
  async nanudaUserLogin(nanudaUserLoginDto: NanudaUserLoginDto): Promise<Auth> {
    // find or create divided
    const nanudaUser = await this.nanudaUserRepo.findOne({
      phone: nanudaUserLoginDto.phone,
      delYN: YN.NO,
    });
    if (!nanudaUser) {
      throw new NanudaException('nanudaUser.notFound');
    }
    const token = await this.sign(nanudaUser);
    // personally do not like how they are divided due to lack of error warnings
    const user = new Auth();
    user.user = nanudaUser;
    user.token = token;
    return user;
  }

  /**
   * sign to jwt payload
   * @param user
   * @param extend
   */
  async sign(user: Admin | NanudaUser, extend?: any) {
    const userSignInInfo: UserSigninPayload = {
      _id: user.phone,
      _no: user.no,
      admin: user.userType === UserType.ADMIN ? true : false,
      username: user.name,
      userType: user.userType,
      adminRole: user.authCode,
    };
    console.log(userSignInInfo);
    return this.jwtService.sign({ ...userSignInInfo, ...extend });
  }

  /**
   * Validate admin
   * @param adminId
   */
  async validateAdminById(adminId: number): Promise<Admin> {
    return await this.adminRepo.findOne(adminId);
  }

  /**
   * validate nanuda user
   * @param userId
   */
  async validateNanudaUserById(userId: number): Promise<NanudaUser> {
    return await this.nanudaUserRepo.findOne(userId);
  }
}
