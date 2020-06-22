import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import {
  AdminDeliverySpaceOptionListDto,
  AdminDeliverySpaceOptionCreateDto,
  AdminDeliverySpaceOptionUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { DeliverySpaceOption } from './delivery-space-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeliverySpaceOptionService extends BaseService {
  constructor(
    @InjectRepository(DeliverySpaceOption)
    private readonly deliverySpaceOptionRepo: Repository<DeliverySpaceOption>,
  ) {
    super();
  }

  /**
   * get all delivery space options
   * @param adminDeliverySpaceOptionListDto
   * @param pagination
   */
  async findAll(
    adminDeliverySpaceOptionListDto: AdminDeliverySpaceOptionListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<DeliverySpaceOption>> {
    const qb = this.deliverySpaceOptionRepo
      .createQueryBuilder()
      .select()
      .WhereAndOrder(adminDeliverySpaceOptionListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * find one for admin
   * @param optionNo
   */
  async findOne(optionNo: number): Promise<DeliverySpaceOption> {
    const option = await this.deliverySpaceOptionRepo.findOne(optionNo);
    if (!option) {
      throw new NotFoundException();
    }
    return option;
  }

  /**
   * create new delivery space option
   * @param adminNo
   * @param adminDeliverySpaceOptionCreateDto
   */
  async create(
    adminNo: number,
    adminDeliverySpaceOptionCreateDto: AdminDeliverySpaceOptionCreateDto,
  ): Promise<DeliverySpaceOption> {
    adminDeliverySpaceOptionCreateDto.adminNo = adminNo;
    let option = new DeliverySpaceOption(adminDeliverySpaceOptionCreateDto);
    option = await this.deliverySpaceOptionRepo.save(option);
    return option;
  }

  /**
   * update existing option
   * @param adminNo
   * @param optionNo
   * @param adminDeliverySpaceOptionUpdateDto
   */
  async update(
    adminNo: number,
    optionNo: number,
    adminDeliverySpaceOptionUpdateDto: AdminDeliverySpaceOptionUpdateDto,
  ): Promise<DeliverySpaceOption> {
    adminDeliverySpaceOptionUpdateDto.adminNo = adminNo;
    let option = await this.deliverySpaceOptionRepo.findOne(optionNo);
    option = option.set(adminDeliverySpaceOptionUpdateDto);
    const updateOption = await this.deliverySpaceOptionRepo.save(option);
    return updateOption;
  }
}
