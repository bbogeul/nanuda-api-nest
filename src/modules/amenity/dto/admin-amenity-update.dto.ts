import { BaseDto } from 'src/core';
import { Amenity } from '../amenity.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { AMENITY } from 'src/shared';

export class AdminAmenityUpdateDto extends BaseDto<AdminAmenityUpdateDto>
  implements Partial<Amenity> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  amenityName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  amenityCode: string;

  @ApiPropertyOptional({ enum: AMENITY })
  @IsOptional()
  @Expose()
  amenityType: AMENITY;
}
