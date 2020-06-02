import { BaseService } from 'src/core';
import { Injectable } from '@nestjs/common';
import { AdminPopupCreateDto, AdminPopupListDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Popup } from './popup.entity';
import { Repository } from 'typeorm';
import { PaginatedResponse, PaginatedRequest } from 'src/common';

@Injectable()
export class PopupService extends BaseService {
  constructor(
    @InjectRepository(Popup) private readonly popupRepo: Repository<Popup>,
  ) {
    super();
  }

  /**
   * create new popup
   * @param adminPopupCreateDto
   */
  async create(adminPopupCreateDto: AdminPopupCreateDto): Promise<Popup> {
    const popup = await this.popupRepo.save(new Popup(adminPopupCreateDto));
    return popup;
  }

  /**
   * find all for admin
   * TODO: image upload
   * @param adminPopupListDto
   * @param pagination
   */
  async findAll(
    adminPopupListDto: AdminPopupListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Popup>> {
    const qb = await this.popupRepo
      .createQueryBuilder('Popup')
      .AndWhereLike(
        'Popup',
        'title',
        adminPopupListDto.title,
        adminPopupListDto.exclude('title'),
      )
      .AndWhereLike(
        'Popup',
        'linkType',
        adminPopupListDto.linkType,
        adminPopupListDto.exclude('linkType'),
      )
      .AndWhereLike(
        'Popup',
        'popupType',
        adminPopupListDto.popupType,
        adminPopupListDto.exclude('popupType'),
      )
      .AndWhereLike(
        'Popup',
        'showYn',
        adminPopupListDto.showYn,
        adminPopupListDto.exclude('showYn'),
      )
      .AndWhereLike(
        'Popup',
        'delYn',
        adminPopupListDto.delYn,
        adminPopupListDto.exclude('delYn'),
      )
      .WhereAndOrder(adminPopupListDto)
      .Paginate(pagination);

    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }
}
