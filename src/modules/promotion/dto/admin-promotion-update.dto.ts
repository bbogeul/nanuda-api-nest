import { BaseDto } from 'src/core';
import { Promotion } from '../promotion.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { YN, Default } from 'src/common';
import { PromotionProperty } from 'src/modules/promotion-property/promotion-property.entity';

export class AdminPromotionUpdateDto extends BaseDto<AdminPromotionUpdateDto>
  implements Partial<Promotion> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  companyNo?: number;

  adminNo?: number;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @Default(YN.YES)
  @Expose()
  @IsOptional()
  detailShowYn?: YN;

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
