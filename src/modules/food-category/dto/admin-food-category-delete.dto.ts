import { BaseDto } from 'src/core';
import { FoodCategory } from '../food-category.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { YN } from 'src/common';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

export class AdminFoodCategoryDeleteDto
  extends BaseDto<AdminFoodCategoryDeleteDto>
  implements Partial<FoodCategory> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Expose()
  delYn?: YN;
}
