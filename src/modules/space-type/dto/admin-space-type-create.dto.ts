import { BaseDto } from 'src/core';
import { SpaceType } from '../space-type.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN, Default } from 'src/common';

export class AdminSpaceTypeCreateDto extends BaseDto<AdminSpaceTypeCreateDto>
  implements Partial<SpaceType> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  code: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  displayName?: string;

  @ApiPropertyOptional({ enum: YN })
  @Expose()
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  showYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @Expose()
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  delYn?: YN;
}
