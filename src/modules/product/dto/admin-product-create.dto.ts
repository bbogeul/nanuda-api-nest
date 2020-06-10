import { BaseDto } from 'src/core';
import { Product } from '../product.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { BusinessModelType } from './admin-product-list.dto';
import { YN, Default } from 'src/common';

export class AdminProductCreateDto extends BaseDto<AdminProductCreateDto>
  implements Partial<Product> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  initialCharge: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  monthlyFee: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  monthlyPer: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  addFee: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  addPer: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  manager?: number;

  @ApiPropertyOptional({ enum: BusinessModelType })
  @IsOptional()
  @IsEnum(BusinessModelType)
  @Expose()
  code?: BusinessModelType;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  subTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  etc?: string;

  //   if started was added but no ended??
  // vice versa?
  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  started?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  ended?: Date;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  showYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  delYn?: YN;
}
