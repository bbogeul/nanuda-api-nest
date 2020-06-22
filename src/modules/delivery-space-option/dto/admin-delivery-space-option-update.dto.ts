import { BaseDto } from 'src/core';
import { DeliverySpaceOption } from '../delivery-space-option.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AdminDeliverySpaceOptionUpdateDto
  extends BaseDto<AdminDeliverySpaceOptionUpdateDto>
  implements Partial<DeliverySpaceOption> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  deliverySpaceOptionCode: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  deliverySpaceOptionName?: string;

  adminNo: number;
}
