import { BaseDto } from 'src/core';
import { FoodCategory } from '../food-category.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class AdminFoodCategoryUpdateDto
  extends BaseDto<AdminFoodCategoryUpdateDto>
  implements Partial<FoodCategory> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameKr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;
}
