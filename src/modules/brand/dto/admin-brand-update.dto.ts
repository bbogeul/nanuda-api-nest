import { BaseDto } from 'src/core';
import { Brand } from '../brand.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN } from 'src/common';

export class AdminBrandUpdateDto extends BaseDto<AdminBrandUpdateDto>
  implements Partial<Brand> {
  constructor(partial?: any) {
    super(partial);
  }

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
  @Expose()
  categoryNo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  desc?: string;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @Expose()
  @IsEnum(YN)
  showYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @Expose()
  @IsOptional()
  delYn?: YN;

  adminNo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  spaceTypeIds: string[];
}
