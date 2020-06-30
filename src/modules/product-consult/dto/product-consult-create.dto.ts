import { BaseDto } from 'src/core';
import { ProductConsult } from '../product-consult.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AVAILABLE_TIME, SPACE_TYPE } from 'src/shared';
import { IsEnum } from 'class-validator';
import { YN, Default } from 'src/common';

export class ProductConsultCreateDto extends BaseDto<ProductConsultCreateDto>
  implements Partial<ProductConsult> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @Expose()
  productId: number;

  @ApiProperty({ enum: AVAILABLE_TIME })
  @Expose()
  @IsEnum(AVAILABLE_TIME)
  hopeTime: AVAILABLE_TIME;

  @ApiProperty({ enum: YN })
  @Expose()
  @IsEnum(YN)
  @Default(YN.NO)
  changUpExpYn: YN;

  @ApiProperty()
  @Expose()
  spaceTypeNo: SPACE_TYPE;
}
