import { BaseDto } from 'src/core';
import { SpaceType } from '../space-type.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN } from 'src/common';

export class AdminSpaceTypeListDto extends BaseDto<AdminSpaceTypeListDto>
  implements Partial<SpaceType> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  displayName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  code?: string;

  delYn: YN.NO;
}
