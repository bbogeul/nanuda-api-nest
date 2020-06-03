import { BaseDto } from 'src/core';
import { Brand } from '../brand.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { YN, Default, ORDER_BY_VALUE } from 'src/common';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

export class BrandListDto extends BaseDto<BrandListDto>
  implements Partial<Brand> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @Expose()
  @Default(YN.YES)
  showYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @Expose()
  @Default(YN.NO)
  delYn?: YN;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsOptional()
  @Expose()
  @Default(ORDER_BY_VALUE.DESC)
  @IsEnum(ORDER_BY_VALUE)
  orderByNo: ORDER_BY_VALUE;
}
