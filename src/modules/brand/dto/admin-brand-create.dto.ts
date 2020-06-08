import { BaseDto } from 'src/core';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { Brand } from '../brand.entity';
import { Default, UserInfo, YN } from 'src/common';
import { Admin } from 'src/modules/admin';
import { SPACE_TYPE } from 'src/shared';

export class AdminBrandCreateDto extends BaseDto<AdminBrandCreateDto>
  implements Partial<Brand> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  nameKr: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  desc?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  categoryNo?: number;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  showYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  delYn?: YN;

  adminNo: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  spaceTypeIds: string[];
}
