import { BaseDto } from 'src/core';
import { Promotion } from '../promotion.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ORDER_BY_VALUE, Default } from 'src/common';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

export class AdminPromotionListDto extends BaseDto<AdminPromotionListDto>
  implements Partial<Promotion> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  companyNo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  promotionTypeNo?: number;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsOptional()
  @Expose()
  @Default(ORDER_BY_VALUE.DESC)
  @IsEnum(ORDER_BY_VALUE)
  orderByNo?: ORDER_BY_VALUE;
}
