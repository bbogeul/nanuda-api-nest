import { BaseDto } from 'src/core';
import { Menu } from '../menu.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN, Default } from 'src/common';

export class AdminMenuUpdateDto extends BaseDto<AdminMenuUpdateDto>
  implements Partial<Menu> {
  constructor(partial?: any) {
    super(partial);
  }
  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameKr: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  brandNo: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  desc?: string;

  @ApiPropertyOptional({ enum: YN })
  @Expose()
  @IsEnum(YN)
  @Default(YN.NO)
  @IsOptional()
  mainYn: YN;

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
}
