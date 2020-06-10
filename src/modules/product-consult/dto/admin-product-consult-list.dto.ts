import { BaseDto } from 'src/core';
import { ProductConsult } from '../product-consult.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { YN, Default, ORDER_BY_VALUE } from 'src/common';
import { IsEnum, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { PRODUCT_CONSULT } from 'src/shared';

export class AdminProductConsultListDto
  extends BaseDto<AdminProductConsultListDto>
  implements Partial<ProductConsult> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: PRODUCT_CONSULT })
  @IsOptional()
  @IsEnum(PRODUCT_CONSULT)
  @Expose()
  status?: PRODUCT_CONSULT;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nanudaUserNo?: number;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsEnum(ORDER_BY_VALUE)
  @Default(ORDER_BY_VALUE.DESC)
  @IsOptional()
  @Expose()
  orderByNo?: ORDER_BY_VALUE;
}
