import { BaseDto } from 'src/core';
import { Promotion } from '../promotion.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { YN, Default } from 'src/common';
import { PromotionProperty } from 'src/modules/promotion-property/promotion-property.entity';

export class AdminPromotionCreateDto extends BaseDto<AdminPromotionCreateDto>
  implements Partial<Promotion> {
  constructor(partial?: any) {
    super();
  }

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  companyNo: number;

  adminNo: number;

  @ApiProperty({ enum: YN })
  @IsEnum(YN)
  @Default(YN.YES)
  @Expose()
  detailShowYn: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  content?: string;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Expose()
  @Default(YN.NO)
  listShowYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Expose()
  @Default(YN.NO)
  delYn?: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  promotionTypeNo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  promotionProperty?: PromotionProperty[];
}
