import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import { AdminHomepageMediaListDto } from './dto/admin-homepage-media-list.dto';
import {
  PaginatedRequest,
  PaginatedResponse,
  YN,
  ORDER_BY_VALUE,
} from 'src/common';
import { HomepageMedia } from './homepage-media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AdminHomepageMediaCreateDto,
  AdminHomepageMediaUpdateDto,
} from './dto';

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

  /**
   * find one for admin
   * @param homepageMediaNo
   */
  async findOne(homepageMediaNo: number): Promise<HomepageMedia> {
    return this.__find_one_media(homepageMediaNo);
  }

  /**
   * create new homepage media
   * @param adminHomepageCreateDto
   */
  async create(
    adminHomepageCreateDto: AdminHomepageMediaCreateDto,
  ): Promise<HomepageMedia> {
    let media = new HomepageMedia(adminHomepageCreateDto);
    media = await this.homepageMediaRepo.save(media);
    return media;
  }

  /**
   * update homepage media
   * @param homepageMediaNo
   * @param adminHomepageUpdateDto
   */
  async update(
    homepageMediaNo: number,
    adminHomepageUpdateDto: AdminHomepageMediaUpdateDto,
  ): Promise<HomepageMedia> {
    const media = await this.__find_one_media(homepageMediaNo);
    let update = media.set(adminHomepageUpdateDto);
    update = await this.homepageMediaRepo.save(update);
    return update;
  }

  /**
   * find for homepage youtube
   */
  async findForHomepageYoutube(): Promise<HomepageMedia> {
    const qb = this.homepageMediaRepo
      .createQueryBuilder('homepageMedia')
      .where('homepageMedia.showYn = :showYn', { showYn: YN.YES })
      .limit(1)
      .orderBy('homepageMedia.no', ORDER_BY_VALUE.DESC)
      .getOne();
    return await qb;
  }

  private async __find_one_media(
    homepageMediaNo: number,
  ): Promise<HomepageMedia> {
    const media = await this.homepageMediaRepo.findOne(homepageMediaNo);
    if (!media) {
      throw new NotFoundException();
    }
    return media;
  }
}
