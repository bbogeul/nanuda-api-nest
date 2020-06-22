import { BaseDto } from 'src/core';
import { Amenity } from '../amenity.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { AMENITY } from 'src/shared';
import { ORDER_BY_VALUE, Default } from 'src/common';

export class AdminAmenityListDto extends BaseDto<AdminAmenityListDto>
  implements Partial<Amenity> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  amenityCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  amenityName?: string;

  @ApiPropertyOptional({ enum: AMENITY })
  @IsOptional()
  @Expose()
  @IsEnum(AMENITY)
  amenityType?: AMENITY;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @Expose()
  @IsOptional()
  @IsEnum(ORDER_BY_VALUE)
  @Default(ORDER_BY_VALUE.DESC)
  orderByNo?: ORDER_BY_VALUE;
}
