import { BaseService, NanudaException } from 'src/core';
import { Injectable } from '@nestjs/common';
import {
  AdminPopupCreateDto,
  AdminPopupListDto,
  PopupListDto,
  AdminPopupDeleteDto,
  AdminPopupListWithDeleteDto,
} from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Popup } from './popup.entity';
import { Repository } from 'typeorm';
import {
  PaginatedResponse,
  PaginatedRequest,
  YN,
  ORDER_BY_VALUE,
} from 'src/common';

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
   * soft delete popup
   * @param popupId
   * @param adminPopupDeleteDto
   */
  async softDelete(
    popupId: number,
    adminPopupDeleteDto: AdminPopupDeleteDto,
  ): Promise<Popup> {
    let popup = await this.popupRepo.findOne({
      where: {
        no: popupId,
        delYn: YN.NO,
      },
    });
    if (!popup) {
      throw new NanudaException('popup.notFound');
    }
    // update delYn
    popup = await this.popupRepo.save(popup.set(adminPopupDeleteDto));
    return popup;
  }

  /**
   * hard delete for admin
   * @param popupId
   */
  async hardDelete(popupId: number): Promise<boolean> {
    const popup = await this.popupRepo.findOne({
      where: {
        no: popupId,
      },
    });
    if (!popup) {
      throw new NanudaException('popup.notFound');
    }
    await this.popupRepo
      .createQueryBuilder()
      .delete()
      .where('no = :no', { no: popupId })
      .execute();

    return true;
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
      .WhereAndOrder(adminPopupListDto)
      .Paginate(pagination);

    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * find one for admin
   * @param popupId
   */
  async findOne(popupId: number): Promise<Popup> {
    const popup = await this.popupRepo.findOne({
      no: popupId,
      delYn: YN.NO,
    });
    if (!popup) {
      throw new NanudaException('popup.notFound');
    }
    return popup;
  }

  /**
   * find all popups even with soft delete
   * @param pagination
   */
  async findWithSoftDelete(
    adminPopupListWithDelete: AdminPopupListWithDeleteDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Popup>> {
    const qb = await this.popupRepo
      .createQueryBuilder('Popup')
      .WhereAndOrder(adminPopupListWithDelete)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * find one with delete
   * @param popupId
   */
  async findOneWithSoftDelete(popupId: number): Promise<Popup> {
    const popup = await this.popupRepo.findOne(popupId);
    if (!popup) {
      throw new NanudaException('popup.notFound');
    }
    return popup;
  }

  /**
   * find for homepage
   * finds between started and ended
   * @param popupListDto
   * @param pagination
   */
  async findForHomepage(
    popupListDto: PopupListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Popup>> {
    const qb = await this.popupRepo
      .createQueryBuilder('Popup')
      .select()
      .AndWhereLike(
        'Popup',
        'delYn',
        popupListDto.delYn,
        popupListDto.exclude('delYn'),
      )
      .AndWhereLike(
        'Popup',
        'showYn',
        popupListDto.showYn,
        popupListDto.exclude('showYn'),
      )
      .AndWhereBetweenDate(popupListDto.currented)
      .WhereAndOrder(popupListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }
}
