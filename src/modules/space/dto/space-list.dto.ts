import { BaseDto } from 'src/core';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { Space } from '../space.entity';
import { SPACE_TYPE } from 'src/shared';
import { ORDER_BY_VALUE, Default, YN } from 'src/common';

export class SpaceListDto extends BaseDto<SpaceListDto>
  implements Partial<Space> {
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
  spaceTypeNo?: SPACE_TYPE;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  sigunguCode?: string;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsOptional()
  @IsEnum(ORDER_BY_VALUE)
  @Expose()
  @Default(ORDER_BY_VALUE.DESC)
  orderByNo?: ORDER_BY_VALUE;

  //   fixed values
  showYn: YN.YES;
  delYn: YN.NO;
}
