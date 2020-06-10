import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BaseService } from 'src/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import {
  AdminProductListDto,
  AdminProductCreateDto,
  AdminProductUpdateDto,
  ProductListDto,
} from './dto';
import { PaginatedRequest, PaginatedResponse, YN } from 'src/common';
@Injectable()
export class ProductService extends BaseService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {
    super();
  }

  /**
   * find all products for admin
   * @param adminProductListDto
   * @param pagination
   */
  async findAll(
    adminProductListDto: AdminProductListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Product>> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .select()
      .CustomLeftJoinAndSelect(['admin'])
      .WhereAndOrder(adminProductListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }

  /**
   * TODO: IMAGES
   * find one for admin
   * @param productId
   */
  async findOne(productId: number): Promise<Product> {
    const check = await this.productRepo.findOne({
      where: { no: productId, delYn: YN.NO },
    });
    if (!check) {
      //   TODO: Change to NanudaException
      throw new NotFoundException();
    }
    const qb = this.productRepo
      .createQueryBuilder('product')
      .CustomLeftJoinAndSelect(['admin'])
      .where('product.no = :no', { no: productId });
    return await qb.getOne();
  }

  /**
   * create new product
   * @param adminProductCreateDto
   */
  async create(adminProductCreateDto: AdminProductCreateDto): Promise<Product> {
    let product = new Product(adminProductCreateDto);
    if (adminProductCreateDto.started || !adminProductCreateDto.ended) {
      throw new BadRequestException(
        'Must have end date if start date is configured.',
      );
    }
    // starts today if started date was not configured
    if (!adminProductCreateDto.started || adminProductCreateDto.ended) {
      adminProductCreateDto.started = new Date();
    }
    product = await this.productRepo.save(product);
    return product;
  }

  /**
   * product update by admin
   * @param productId
   * @param adminProductUpdateDto
   */
  async update(
    productId: number,
    adminProductUpdateDto: AdminProductUpdateDto,
  ): Promise<Product> {
    let product = await this.productRepo.findOne({
      where: {
        no: productId,
        delYn: YN.NO,
      },
    });
    if (product) {
      // does not exist
      // change to NanudaException
      throw new NotFoundException();
    }
    product = await this.productRepo.save(product.set(adminProductUpdateDto));
    return product;
  }

  /**
   * find for homepage
   * @param productListDto
   * @param pagination
   */
  async homePageProduct(
    productListDto: ProductListDto,
    pagination?: PaginatedRequest,
  ): Promise<PaginatedResponse<Product>> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .where('product.showYn = :showYn', { showYn: YN.YES })
      .WhereAndOrder(productListDto)
      .Paginate(pagination);
    const [items, totalCount] = await qb.getManyAndCount();
    return { items, totalCount };
  }
}
