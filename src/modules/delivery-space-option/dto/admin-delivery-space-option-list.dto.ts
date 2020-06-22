import { BaseDto } from 'src/core';
import { DeliverySpaceOption } from '../delivery-space-option.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { ORDER_BY_VALUE, Default } from 'src/common';

export class AdminDeliverySpaceOptionListDto
  extends BaseDto<AdminDeliverySpaceOptionListDto>
  implements Partial<DeliverySpaceOption> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  deliverySpaceOptionCode?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  deliverySpaceOptionName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  adminNo?: number;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsEnum(ORDER_BY_VALUE)
  @Expose()
  @Default(ORDER_BY_VALUE.DESC)
  @IsOptional()
  orderByNo?: ORDER_BY_VALUE;
}
