import { BaseDto } from 'src/core';
import { Product } from '../product.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class AdminProductUpdateDto extends BaseDto<AdminProductUpdateDto>
  implements Partial<Product> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  initialCharge?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  monthlyFee?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  monthlyPer?: string;

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

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  manager?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  started?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  ended?: Date;
}
