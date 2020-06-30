import { BaseDto } from 'src/core';
import { ProductConsult } from '../product-consult.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ORDER_BY_VALUE, Default } from 'src/common';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { SPACE_TYPE } from 'src/shared';

export class ProductConsultListDto extends BaseDto<ProductConsultListDto>
  implements Partial<ProductConsult> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: SPACE_TYPE })
  @IsOptional()
  @Expose()
  @IsEnum(SPACE_TYPE)
  spaceTypeNo?: SPACE_TYPE;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsOptional()
  @IsEnum(ORDER_BY_VALUE)
  @Expose()
  @Default(ORDER_BY_VALUE.DESC)
  orderByNo?: ORDER_BY_VALUE;
}
