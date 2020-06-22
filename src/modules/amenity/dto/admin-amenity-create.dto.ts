import { BaseDto } from 'src/core';
import { Amenity } from '../amenity.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { AMENITY } from 'src/shared';

export class AdminAmenityCreateDto extends BaseDto<AdminAmenityCreateDto>
  implements Partial<Amenity> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  amenityName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  amenityCode: string;

  @ApiProperty({ enum: AMENITY })
  @IsNotEmpty()
  @Expose()
  amenityType: AMENITY;
}
