import { BaseDto } from 'src/core';
import { Product } from '../product.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { YN, Default, ORDER_BY_VALUE } from 'src/common';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

export class ProductListDto extends BaseDto<ProductListDto>
  implements Partial<Product> {
  constructor(partial?: any) {
    super();
  }

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsOptional()
  @IsEnum(ORDER_BY_VALUE)
  @Default(ORDER_BY_VALUE.ASC)
  @Expose()
  orderByNo?: ORDER_BY_VALUE;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  title?: string;
}
