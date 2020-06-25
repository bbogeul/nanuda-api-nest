import { BaseDto } from 'src/core';
import { SpaceType } from '../space-type.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN, Default } from 'src/common';

export class AdminSpaceTypeUpdateDto extends BaseDto<AdminSpaceTypeUpdateDto>
  implements Partial<SpaceType> {
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
  displayName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  code?: string;

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
}
