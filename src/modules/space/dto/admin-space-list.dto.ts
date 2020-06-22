import { BaseDto } from 'src/core';
import { Space } from '../space.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsEnum } from 'class-validator';
import { YN, ORDER_BY_VALUE, Default } from 'src/common';
import { SPACE } from 'src/shared';

export class AdminSpaceListDto extends BaseDto<AdminSpaceListDto>
  implements Partial<Space> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ enum: YN })
  @Expose()
  @IsOptional()
  @IsEnum(YN)
  showYn?: YN;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsEnum(ORDER_BY_VALUE)
  @Expose()
  @IsOptional()
  @Default(ORDER_BY_VALUE.DESC)
  orderByNo?: ORDER_BY_VALUE;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @IsOptional()
  @Default(YN.NO)
  @Expose()
  delYn?: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  rentalType?: SPACE.TIME | SPACE.ALL | SPACE.KITCHEN;

  @ApiPropertyOptional({ enum: SPACE })
  @IsOptional()
  @IsEnum(SPACE)
  @Expose()
  status?: SPACE;
}
