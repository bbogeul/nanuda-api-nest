import { Injectable } from '@nestjs/common';
import { BaseService, NanudaException } from 'src/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NanudaUser } from './nanuda-user.entity';
import { NanudaUserCreateDto } from './dto';

@Injectable()
export class NanudaUserService extends BaseService {
  constructor(
    @InjectRepository(NanudaUser)
    private readonly nanudaUserRepo: Repository<NanudaUser>,
  ) {
    super();
  }

  /**
   * Create new nanuda user
   * @param nanudaUserCreateDto
   */
  async create(nanudaUserCreateDto: NanudaUserCreateDto): Promise<NanudaUser> {
    const check = await this.__check_user_exists(nanudaUserCreateDto.phone);
    if (check) {
      throw new NanudaException('nanudaUser.exists');
    }
    return await this.nanudaUserRepo.save(new NanudaUser(nanudaUserCreateDto));
  }

  /**
   * check if user exists by phone
   * @param phone
   */
  private async __check_user_exists(phone: string): Promise<boolean> {
    const checkUser = await this.nanudaUserRepo.findOne({
      where: { phone: phone },
    });
    if (checkUser) {
      return true;
    } else {
      return false;
    }
  }
}
