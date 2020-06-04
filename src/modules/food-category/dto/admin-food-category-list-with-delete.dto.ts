import { BaseDto } from 'src/core';
import { FoodCategory } from '../food-category.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FOOD_CATEGORY } from 'src/shared';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN, Default, ORDER_BY_VALUE } from 'src/common';

export class AdminFoodCategoryListWithDeleteDto
  extends BaseDto<AdminFoodCategoryListWithDeleteDto>
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

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @Default(ORDER_BY_VALUE.DESC)
  @Expose()
  @IsEnum(ORDER_BY_VALUE)
  orderByNo?: ORDER_BY_VALUE;
}
