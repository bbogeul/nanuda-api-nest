import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import { PaginatedRequest, PaginatedResponse, YN } from 'src/common';
import { Promotion } from './promotion.entity';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import {
  AdminPromotionCreateDto,
  AdminPromotionListDto,
  AdminPromotionUpdateDto,
} from './dto';
import { Company } from '../company/company.entity';
import { PromotionProperty } from '../promotion-property/promotion-property.entity';
import { PromotionPropertyType } from '../promotion-property-type/promotion-property-type.entity';
import { PromotionSpaceMapper } from '../promotion-space-mapper/promotion-space-mapper.entity';

@Injectable()
export class PromotionService extends BaseService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepo: Repository<Promotion>,
    @InjectRepository(PromotionProperty)
    private readonly promotionPropertyRepo: Repository<PromotionProperty>,
    @InjectRepository(PromotionPropertyType)
    private readonly promotionPropertyTypeRepo: Repository<
      PromotionPropertyType
    >,
    @InjectRepository(PromotionSpaceMapper)
    private readonly promotionSpaceMapperRepo: Repository<PromotionSpaceMapper>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {
    super();
  }

  /**
   * find by company id
   * @param companyNo
   * @param pagination
   */
  async findAllByCompany(
    companyNo: number,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Promotion>> {
    const qb = this.promotionRepo
      .createQueryBuilder('promotion')
      .CustomLeftJoinAndSelect(['promotionProperties'])
      .where('promotion.companyNo = :companyNo', { companyNo: companyNo })
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * find all for admin
   * @param adminPromotionListDto
   * @param pagination
   */
  async findAll(
    adminPromotionListDto: AdminPromotionListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Promotion>> {
    const qb = this.promotionRepo
      .createQueryBuilder('promotion')
      .CustomLeftJoinAndSelect(['company', 'promotionProperties'])
      .AndWhereLike(
        'promotion',
        'title',
        adminPromotionListDto.title,
        adminPromotionListDto.exclude('title'),
      )
      .WhereAndOrder(adminPromotionListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * find one promotion
   * @param promotionNo
   */
  async findOne(promotionNo: number): Promise<Promotion> {
    const promotion = await this.promotionRepo.findOne({
      where: { no: promotionNo, delYn: YN.NO },
    });
    if (!promotion) {
      throw new NotFoundException();
    }
    const qb = this.promotionRepo
      .createQueryBuilder('promotion')
      .CustomLeftJoinAndSelect(['promotionProperties', 'company'])
      .andWhereInIds(promotionNo);
    return await qb.getOne();
  }

  /**
   * create new promotion
   * @param adminNo
   * @param companyNo
   * @param adminPromotionCreateDto
   */
  async create(
    adminNo: number,
    adminPromotionCreateDto: AdminPromotionCreateDto,
  ): Promise<Promotion> {
    const checkCompany = await this.companyRepo.findOne(
      adminPromotionCreateDto.companyNo,
    );
    if (!checkCompany) {
      throw new NotFoundException();
    }
    adminPromotionCreateDto.adminNo = adminNo;
    const promotion = await this.entityManager.transaction(
      async entityManager => {
        let promotion = new Promotion(adminPromotionCreateDto);
        promotion = await entityManager.save(promotion);
        if (
          adminPromotionCreateDto.promotionProperty &&
          adminPromotionCreateDto.promotionProperty.length > 0
        ) {
          // array.map is not transactionable.
          await Promise.all(
            adminPromotionCreateDto.promotionProperty.map(async property => {
              let newProperty = new PromotionProperty(property);
              newProperty.promotionNo = promotion.no;
              newProperty.adminNo = adminNo;
              newProperty = await entityManager.save(newProperty);
              const checkType = await this.promotionPropertyTypeRepo.findOne({
                where: { key: newProperty.key },
              });
              if (!checkType) {
                let newType = new PromotionPropertyType();
                newType.key = newProperty.key;
                newType = await entityManager.save(newType);
              }
            }),
          );
        }
        return promotion;
      },
    );
    return promotion;
  }

  /**
   * update existing promotion
   * @param adminNo
   * @param promotionNo
   * @param adminPromotionUpdateDto
   */
  async update(
    adminNo: number,
    promotionNo: number,
    adminPromotionUpdateDto: AdminPromotionUpdateDto,
  ): Promise<Promotion> {
    const checkPromotion = await this.promotionRepo.findOne({
      where: { no: promotionNo, delYn: YN.NO },
    });
    if (!checkPromotion) {
      throw new NotFoundException();
    }
    const promotion = await this.entityManager.transaction(
      async entityManager => {
        let promotion = await this.promotionRepo.findOne(promotionNo);
        adminPromotionUpdateDto.adminNo = adminNo;
        promotion = promotion.set(adminPromotionUpdateDto);
        promotion = await entityManager.save(promotion);
        if (adminPromotionUpdateDto.delYn === YN.NO) {
          await this.promotionSpaceMapperRepo
            .createQueryBuilder('promotionSpaceMapper')
            .delete()
            .where('promotionSpaceMapper.promotionNo = :promotionNo', {
              promotionNo: promotionNo,
            })
            .execute();
        }
        if (
          adminPromotionUpdateDto.delYn !== YN.NO &&
          adminPromotionUpdateDto.promotionProperty &&
          adminPromotionUpdateDto.promotionProperty.length > 0
        ) {
          // delete previous ones
          await this.promotionPropertyRepo
            .createQueryBuilder('promotionProperty')
            .delete()
            .where('promotionProperty.promotionNo = :promotionNo', {
              promotionNo: promotionNo,
            })
            .execute();
          await Promise.all(
            adminPromotionUpdateDto.promotionProperty.map(async property => {
              let newProperty = new PromotionProperty(property);
              newProperty.promotionNo = promotion.no;
              newProperty.adminNo = adminNo;
              newProperty = await entityManager.save(newProperty);
              const checkType = await this.promotionPropertyTypeRepo.findOne({
                where: { key: newProperty.key },
              });
              if (!checkType) {
                let newType = new PromotionPropertyType();
                newType.key = newProperty.key;
                newType = await entityManager.save(newType);
              }
            }),
          );
        }
        return promotion;
      },
    );
    return promotion;
  }
}
