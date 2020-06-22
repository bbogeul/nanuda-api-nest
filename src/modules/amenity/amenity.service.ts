import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Amenity } from './amenity.entity';
import { Repository } from 'typeorm';
import {
  AdminAmenityListDto,
  AdminAmenityCreateDto,
  AdminAmenityUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';

@Injectable()
export class AmenityService extends BaseService {
  constructor(
    @InjectRepository(Amenity)
    private readonly amenityRepo: Repository<Amenity>,
  ) {
    super();
  }

  /**
   * find all amenities
   * @param adminAmenityListDto
   * @param pagination
   */
  async findAll(
    adminAmenityListDto: AdminAmenityListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Amenity>> {
    const qb = this.amenityRepo
      .createQueryBuilder('amenity')
      .AndWhereLike(
        'amenity',
        'amenityName',
        adminAmenityListDto.amenityName,
        adminAmenityListDto.exclude('amenityName'),
      )
      .AndWhereLike(
        'amenity',
        'amenityCode',
        adminAmenityListDto.amenityName,
        adminAmenityListDto.exclude('amenityCode'),
      )
      .WhereAndOrder(adminAmenityListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * find one amenity for admi
   * @param amenityNo
   */
  async findOne(amenityNo: number): Promise<Amenity> {
    return await this.__find_one_amenity(amenityNo);
  }

  /**
   * create new amenity
   * @param adminAmenityCreateDto
   */
  async create(adminAmenityCreateDto: AdminAmenityCreateDto): Promise<Amenity> {
    let amenity = new Amenity(adminAmenityCreateDto);
    amenity = await this.amenityRepo.save(amenity);
    return amenity;
  }

  /**
   * update single amenity
   * @param amenityNo
   * @param adminAmenityUpdateDto
   */
  async update(
    amenityNo: number,
    adminAmenityUpdateDto: AdminAmenityUpdateDto,
  ): Promise<Amenity> {
    let amenity = await this.__find_one_amenity(amenityNo);
    amenity = amenity.set(adminAmenityUpdateDto);
    amenity = await this.amenityRepo.save(amenity);
    return amenity;
  }

  /**
   * private find one
   * @param amenityNo
   */
  private async __find_one_amenity(amenityNo: number): Promise<Amenity> {
    const amenity = await this.amenityRepo.findOne(amenityNo);
    if (!amenity) {
      throw new NotFoundException();
    }
    return amenity;
  }
}
