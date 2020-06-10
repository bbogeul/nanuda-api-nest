import { BrandListDto } from './brand-list.dto';
import { Brand } from '../brand.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { YN, Default, ORDER_BY_VALUE } from 'src/common';
import { IsOptional, IsEnum, IsNumber, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { SPACE_TYPE } from 'src/shared';
import { BaseDto } from 'src/core';

export class AdminBrandListDto extends BaseDto<AdminBrandListDto>
  implements Partial<Brand> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Expose()
  @Default(YN.NO)
  delYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Expose()
  showYn?: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameKr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @MaxLength(1)
  @Expose()
  categoryNo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Expose()
  adminNo?: number;

  @ApiPropertyOptional({ enum: SPACE_TYPE })
  @IsOptional()
  @IsEnum(SPACE_TYPE)
  @Expose()
  spaceTypeNo?: SPACE_TYPE;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsOptional()
  @Expose()
  @Default(ORDER_BY_VALUE.DESC)
  @IsEnum(ORDER_BY_VALUE)
  orderByNo: ORDER_BY_VALUE;
}
