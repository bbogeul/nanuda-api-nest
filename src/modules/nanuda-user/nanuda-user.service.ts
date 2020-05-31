import { Injectable } from '@nestjs/common';
import { BaseService, NanudaException } from 'src/core';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { NanudaUser } from './nanuda-user.entity';
import {
  NanudaUserCreateDto,
  NanudaUserUpdateDto,
  AdminNanudaUserListDto,
  AdminNanudaUserDeleteDto,
} from './dto';
import { NanudaUserUpdateHistory } from '../nanuda-user-update-history/nanuda-user-update-history.entity';
import { PaginatedRequest, PaginatedResponse } from 'src/common';

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
   * update own user's information
   * @param nanudaUserId
   * @param nanudaUserUpdateDto
   */
  async update(
    nanudaUserId,
    nanudaUserUpdateDto: NanudaUserUpdateDto,
  ): Promise<NanudaUser> {
    const check = await this.__check_user_through_id(nanudaUserId);
    if (!check) {
      throw new NanudaException('nanudaUser.notExists');
    }
    const nanudaUser = await this.entityManager.transaction(
      async entityManager => {
        let nanudaUser = await this.nanudaUserRepo.findOne(nanudaUserId);
        if (!nanudaUser) {
          throw new NanudaException('nanudaUser.notExists');
        }
        nanudaUser = await entityManager.save(
          nanudaUser.set(nanudaUserUpdateDto),
        );
        let nanudaUpdateHistory = new NanudaUserUpdateHistory(nanudaUser);
        nanudaUpdateHistory.nanudaUserNo = nanudaUser.no;
        nanudaUpdateHistory = await entityManager.save(nanudaUpdateHistory);
        return nanudaUser;
      },
    );
    return nanudaUser;
  }

  /**
   * require probably relations with other tables
   * user list for admin
   * @param adminNanudaListDto
   * @param pagination
   */
  async findAll(
    adminNanudaListDto: AdminNanudaUserListDto,
    pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<NanudaUser>> {
    const qb = await this.nanudaUserRepo
      .createQueryBuilder('NanudaUser')
      .AndWhereLike(
        'NanudaUser',
        'name',
        adminNanudaListDto.name,
        adminNanudaListDto.exclude('name'),
      )
      .AndWhereLike(
        'NanudaUser',
        'phone',
        adminNanudaListDto.phone,
        adminNanudaListDto.exclude('phone'),
      )
      .AndWhereLike(
        'NanudaUser',
        'serviceYn',
        adminNanudaListDto.serviceYn,
        adminNanudaListDto.exclude('serviceYn'),
      )
      .AndWhereLike(
        'NanudaUser',
        'infoYn',
        adminNanudaListDto.infoYn,
        adminNanudaListDto.exclude('infoYn'),
      )
      .AndWhereLike(
        'NanudaUser',
        'marketYn',
        adminNanudaListDto.marketYn,
        adminNanudaListDto.exclude('marketYn'),
      )
      .WhereAndOrder(adminNanudaListDto)
      .Paginate(pagination);

    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * Find one user for admin
   * @param nanudaUserId
   */
  async findOne(nanudaUserId: number): Promise<NanudaUser> {
    return await this.nanudaUserRepo.findOne(nanudaUserId);
  }

  /**
   * soft delete by admin
   * @param nanudaUserId
   * @param adminNanudaUserDeleteDto
   */
  async softDelete(
    nanudaUserId: number,
    adminNanudaUserDeleteDto: AdminNanudaUserDeleteDto,
  ): Promise<NanudaUser> {
    let nanudaUser = await this.nanudaUserRepo.findOne(nanudaUserId);
    nanudaUser.delYN = adminNanudaUserDeleteDto.delYN;
    nanudaUser = await this.nanudaUserRepo.save(nanudaUser);
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

  /**
   * check if user exists through id
   * @param id
   */
  private async __check_user_through_id(id: number): Promise<boolean> {
    const checkUser = await this.nanudaUserRepo.findOne(id);
    if (checkUser) {
      return true;
    } else {
      return false;
    }
  }
}
