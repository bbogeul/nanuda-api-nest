import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/core';
import {
  AdminCompanyListDto,
  AdminCompanyCreateDto,
  AdminCompanyUpdateDto,
  AdminCompanyDistrictCreateDto,
  AdminCompanyDistrictUpdateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { CompanyDistrict } from '../company-district/company-district.entity';
import { Space } from '../space/space.entity';

@Injectable()
export class CompanyService extends BaseService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(CompanyDistrict)
    private readonly companyDistrictRepo: Repository<CompanyDistrict>,
  ) {
    super();
  }

  /**
   * create new company
   * @param adminCompanyCreateDto
   * @param adminNo
   */
  async create(
    adminCompanyCreateDto: AdminCompanyCreateDto,
    adminNo: number,
  ): Promise<Company> {
    adminCompanyCreateDto.adminNo = adminNo;
    let company = new Company(adminCompanyCreateDto);
    company = await this.companyRepo.save(company);
    return company;
  }

  /**
   * update existing company
   * @param companyNo
   * @param adminCompanyUpdateDto
   * @param adminNo
   */
  async update(
    companyNo: number,
    adminCompanyUpdateDto: AdminCompanyUpdateDto,
    adminNo: number,
  ): Promise<Company> {
    adminCompanyUpdateDto.adminNo = adminNo;
    let company = await this.companyRepo.findOne({ where: { no: companyNo } });
    if (!company) {
      throw new NotFoundException();
    }
    company = company.set(adminCompanyUpdateDto);
    return await this.companyRepo.save(company);
  }

  /**
   * find for all admin
   * TODO: relations [district and promotion]
   * @param adminCompanyListDto
   * @param pagination
   */
  async findAllForAdmin(
    adminCompanyListDto: AdminCompanyListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Company>> {
    const qb = this.companyRepo
      .createQueryBuilder('company')
      .select()
      .WhereAndOrder(adminCompanyListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * find one company
   * @param companyNo
   */
  async findOneForAdmin(companyNo: number, pagination?: PaginatedRequest) {
    const qb = this.companyRepo
      .createQueryBuilder('company')
      .CustomLeftJoinAndSelect(['promotions'])
      .leftJoinAndSelect(
        'promotions.promotionProperties',
        'promotionProperties',
      )
      .where('promotions.companyNo =: companyNo', { companyNo: companyNo })
      .where('company.no = :no', { no: companyNo });
    const company = await qb.getOne();
    if (!company) {
      throw new NotFoundException();
    }
    const companyDistrict = await this.findAllDistrictsForCompany(
      companyNo,
      pagination,
    );
    return { company, companyDistrict };
  }

  /**
   * find spaces by company
   * @param companyNo
   * @param pagination
   */
  async findSpaceByCompany(companyNo: number, pagination?: PaginatedRequest) {
    const qb = this.companyRepo
      .createQueryBuilder('company')
      .innerJoinAndSelect('company.companyDistricts', 'companyDistricts')
      .innerJoinAndSelect('companyDistricts.spaces', 'spaces')
      .where('company.no = :no', { no: companyNo });
    const spaces = await qb.getMany();
    return spaces;
  }

  /**
   * get all company districts for company
   * @param companyNo
   * @param pagination
   */
  async findAllDistrictsForCompany(
    companyNo: number,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<CompanyDistrict>> {
    const qb = this.companyDistrictRepo
      .createQueryBuilder('companyDistrict')
      .where('companyDistrict.companyNo = :companyNo', {
        companyNo: companyNo,
      })
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * create new company district
   * @param companyNo
   * @param adminCompanyDistrictCreateDto
   */
  async createDistrict(
    companyNo: number,
    adminCompanyDistrictCreateDto: AdminCompanyDistrictCreateDto,
  ): Promise<CompanyDistrict> {
    adminCompanyDistrictCreateDto.companyNo = companyNo;
    const check = await this.companyRepo.findOne({
      where: { no: adminCompanyDistrictCreateDto.companyNo },
    });
    if (!check) {
      throw new NotFoundException();
    }
    let companyDistrict = new CompanyDistrict(adminCompanyDistrictCreateDto);
    companyDistrict = await this.companyDistrictRepo.save(companyDistrict);
    return companyDistrict;
  }

  /**
   * update existing company district
   * @param companyNo
   * @param companyDistrictNo
   * @param adminCompanyDistrictUpdateDto
   */
  async updateDistrict(
    companyNo: number,
    companyDistrictNo: number,
    adminCompanyDistrictUpdateDto: AdminCompanyDistrictUpdateDto,
  ): Promise<CompanyDistrict> {
    let companyDistrict = await this.companyDistrictRepo.findOne({
      no: companyDistrictNo,
      companyNo: companyNo,
    });
    if (!companyDistrict) {
      throw new NotFoundException();
    }
    companyDistrict = companyDistrict.set(adminCompanyDistrictUpdateDto);
    return await this.companyDistrictRepo.save(companyDistrict);
  }
}
