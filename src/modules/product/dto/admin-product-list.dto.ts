import { BaseDto } from 'src/core';
import { Product } from '../product.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ORDER_BY_VALUE, Default, YN } from 'src/common';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

// TODO: remove to code management
export enum BusinessModelType {
  'BM1' = 'BM1',
  'BM2' = 'BM2',
}

export class AdminProductListDto extends BaseDto<AdminProductListDto>
  implements Partial<Product> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  name?: string;

  @ApiPropertyOptional({ enum: BusinessModelType })
  @IsOptional()
  @IsEnum(BusinessModelType)
  @Expose()
  code?: BusinessModelType;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @IsOptional()
  @Expose()
  @Default(YN.NO)
  delYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @IsOptional()
  @Expose()
  showYn?: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  manager?: number;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsOptional()
  @Default(ORDER_BY_VALUE.DESC)
  @Expose()
  @IsEnum(ORDER_BY_VALUE)
  orderByNo?: ORDER_BY_VALUE;
}
