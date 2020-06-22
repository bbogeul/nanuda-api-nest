import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Promotion } from './promotion.entity';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { AdminPromotionCreateDto } from './dto';
import { Company } from '../company/company.entity';
import { PromotionProperty } from '../promotion-property/promotion-property.entity';
import { PromotionPropertyType } from '../promotion-property-type/promotion-property-type.entity';

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
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {
    super();
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
          adminPromotionCreateDto.promotionProperty.map(async property => {
            let newProperty = new PromotionProperty(property);
            newProperty.promotionNo = promotion.no;
            newProperty.adminNo = adminNo;
            newProperty = await entityManager.save(newProperty);
            const checkType = await this.promotionPropertyRepo.findOne({
              where: { key: newProperty.key },
            });
            if (checkType) {
              let newType = new PromotionPropertyType();
              newType.key = newProperty.key;
              newType = await entityManager.save(newType);
            }
          });
        }
        return promotion;
      },
    );
    return promotion;
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
}
