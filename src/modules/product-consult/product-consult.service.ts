import { Injectable } from '@nestjs/common';
import { BaseService, NanudaException } from 'src/core';
import {
  AdminProductConsultListDto,
  AdminProductConsultCreateDto,
  AdminProductConsultUpdateDto,
  ProductConsultCreateDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { ProductConsult } from './product-consult.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin';
import { PRODUCT_CONSULT_NOTIFICATION } from 'src/shared';
import { NanudaUser } from '../nanuda-user';

@Injectable()
export class ProductConsultService extends BaseService {
  constructor(
    @InjectRepository(ProductConsult)
    private readonly productConsultRepo: Repository<ProductConsult>,
    @InjectRepository(NanudaUser)
    private readonly nanudaUserRepo: Repository<NanudaUser>,
  ) {
    super();
  }

  /**
   * find all product consult for admin
   * @param adminProductConsultListDto
   * @param pagination
   */
  async findAll(
    adminProductConsultListDto: AdminProductConsultListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<ProductConsult>> {
    const qb = this.productConsultRepo
      .createQueryBuilder('productConsult')
      .CustomInnerJoinAndSelect(['nanudaUser'])
      .CustomLeftJoinAndSelect(['admin', 'codeManagement', 'product'])
      .WhereAndOrder(adminProductConsultListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();

    return { items, totalCount };
  }

  /**
   * Find one for admin
   * @param productConsultId
   */
  async findOne(productConsultId: number): Promise<ProductConsult> {
    await this.__check_if_product_consult_exists(productConsultId);
    const qb = this.productConsultRepo
      .createQueryBuilder('productConsult')
      .CustomInnerJoinAndSelect(['nanudaUser'])
      .CustomLeftJoinAndSelect(['admin', 'codeManagement', 'product'])
      .where('productConsult.no = :no', { no: productConsultId });
    return await qb.getOne();
  }

  /**
   * create new product consult
   * @param adminProductConsultCreateDto
   */
  async create(
    adminProductConsultCreateDto: AdminProductConsultCreateDto,
  ): Promise<ProductConsult> {
    let productConsult = new ProductConsult(adminProductConsultCreateDto);
    productConsult = await this.productConsultRepo.save(productConsult);
    return productConsult;
  }

  /**
   * update existing product consult
   * @param productConsultId
   * @param adminProductConsultUpdateDto
   */
  async update(
    productConsultId: number,
    adminProductConsultUpdateDto: AdminProductConsultUpdateDto,
  ): Promise<ProductConsult> {
    let productConsult = await this.productConsultRepo.findOne(
      productConsultId,
    );
    if (!productConsult) {
      throw new NanudaException('product.notFound');
    }
    productConsult = productConsult.set(adminProductConsultUpdateDto);
    productConsult = await this.productConsultRepo.save(productConsult);
    return productConsult;
  }

  /**
   * create for nanuda users
   * ACL: NANUDA_USER
   * @param nanudaUserId
   * @param productConsultAdminCreateDto
   */
  async homePageCreate(
    nanudaUserId: number,
    productConsultAdminCreateDto: ProductConsultCreateDto,
  ): Promise<ProductConsult> {
    const user = await this.nanudaUserRepo.findOne(nanudaUserId);
    let productConsult = new ProductConsult(productConsultAdminCreateDto);
    const productConsultNotification = new PRODUCT_CONSULT_NOTIFICATION();
    // try catch for slack notification and insert
    try {
      productConsult = await this.productConsultRepo.save(productConsult);
      // for slack
      // TODO: MODULARIZE THIS SHIT
      productConsultNotification.phone = user.phone;
      productConsultNotification.name = user.name;
      productConsultNotification.hopeTime = productConsult.hopeTime;
      productConsultNotification.referencedId = productConsult.no;
      console.log(productConsultNotification);
      // slack notification
      return productConsult;
    } catch (error) {
      console.log(error);
    }
    return productConsult;
  }

  /**
   * TODO: ATTACH IMAGE
   * Product consult find one for homepage
   * @param nanudaUserId
   * @param productConsultId
   */
  async homePageFindOne(
    nanudaUserId: number,
    productConsultId: number,
  ): Promise<ProductConsult> {
    const check = await this.productConsultRepo.findOne({
      where: {
        no: productConsultId,
        nanudaUserNo: nanudaUserId,
      },
    });
    if (!check) {
      throw new NanudaException('productConsult.notFound');
    }
    const qb = this.productConsultRepo
      .createQueryBuilder('productConsult')
      .CustomLeftJoinAndSelect(['product'])
      .where('productConsult.no = :no', { no: productConsultId })
      .andWhere('productConsult.nanudaUserNo = :nanudaUserNo', {
        nanudaUserNo: nanudaUserId,
      });
    return await qb.getOne();
  }

  /**
   * hard delete product consult
   * @param productConsultId
   */
  async hardDelete(productConsultId: number): Promise<boolean> {
    await this.__check_if_product_consult_exists(productConsultId);
    try {
      await this.productConsultRepo.delete({ no: productConsultId });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }

  private async __check_if_product_consult_exists(id: number) {
    const check = await this.productConsultRepo.findOne(id);
    if (!check) {
      throw new NanudaException('product.notFound');
    }
    return true;
  }
}
