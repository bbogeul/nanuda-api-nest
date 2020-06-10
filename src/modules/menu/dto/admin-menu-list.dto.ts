import { BaseDto } from 'src/core';
import { Menu } from '../menu.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN } from 'src/common';

export class AdminMenuListDto extends BaseDto<AdminMenuListDto>
  implements Partial<Menu> {
  constructor(partial?: any) {
    super(partial);
  }
  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameKr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @Expose()
  @IsEnum(YN)
  mainYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @Expose()
  @IsEnum(YN)
  showYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @Expose()
  @IsEnum(YN)
  delYn?: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  brandNo?: number;
}
