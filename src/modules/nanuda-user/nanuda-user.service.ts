import { Injectable } from '@nestjs/common';
import { BaseService, NanudaException } from 'src/core';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { NanudaUser } from './nanuda-user.entity';
import { NanudaUserCreateDto } from './dto';
import { NanudaUserUpdateHistory } from '../nanuda-user-update-history/nanuda-user-update-history.entity';

@Injectable()
export class NanudaUserService extends BaseService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
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
    const nanudaUser = await this.entityManager.transaction(
      async entityManager => {
        let nanudaUser = new NanudaUser(nanudaUserCreateDto);
        nanudaUser = await entityManager.save(nanudaUser);
        let nanudaUserUpdateHistory = new NanudaUserUpdateHistory(nanudaUser);
        nanudaUserUpdateHistory.nanudaUserNo = nanudaUser.no;
        nanudaUserUpdateHistory = await entityManager.save(
          nanudaUserUpdateHistory,
        );
        return nanudaUser;
      },
    );
    return nanudaUser;
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
