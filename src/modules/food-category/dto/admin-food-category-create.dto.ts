import { BaseDto } from 'src/core';
import { FoodCategory } from '../food-category.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN, Default } from 'src/common';

export class AdminFoodCategoryCreateDto
  extends BaseDto<AdminFoodCategoryCreateDto>
  implements Partial<FoodCategory> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  code?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  nameKr: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  @IsOptional()
  delYn?: YN;
}
