import { BaseDto } from 'src/core';
import { FoodCategory } from '../food-category.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { FOOD_CATEGORY } from 'src/shared';
import { YN, ORDER_BY_VALUE, Default } from 'src/common';

export class AdminFoodCategoryListDto extends BaseDto<AdminFoodCategoryListDto>
  implements Partial<FoodCategory> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: FOOD_CATEGORY })
  @IsOptional()
  @IsEnum(FOOD_CATEGORY)
  @Expose()
  code?: FOOD_CATEGORY;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameKr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  adminNo?: number;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  delYn?: YN;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @Default(ORDER_BY_VALUE.DESC)
  @Expose()
  @IsEnum(ORDER_BY_VALUE)
  orderByNo?: ORDER_BY_VALUE;
}
