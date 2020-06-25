import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core';
import { AdminHomepageMediaListDto } from './dto/admin-homepage-media-list.dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { HomepageMedia } from './homepage-media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HomepageMediaService extends BaseService {
  constructor(
    @InjectRepository(HomepageMedia)
    private readonly homepageMediaRepo: Repository<HomepageMedia>,
  ) {
    super();
  }

  /**
   * list for admin
   * @param adminHomepageMediaListDto
   * @param pagination
   */
  async findAll(
    adminHomepageMediaListDto: AdminHomepageMediaListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<HomepageMedia>> {
    const qb = this.homepageMediaRepo
      .createQueryBuilder('homepageMedia')
      .WhereAndOrder(adminHomepageMediaListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();

    return { items, totalCount };
  }
}
