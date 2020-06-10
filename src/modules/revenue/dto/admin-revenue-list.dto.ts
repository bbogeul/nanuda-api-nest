import { BaseDto } from 'src/core';
import { PaymentList } from 'src/modules/dashboard/dashboard.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { ORDER_BY_VALUE, Default } from 'src/common';

export class AdminRevenueListDto extends BaseDto<AdminRevenueListDto>
  implements Partial<PaymentList> {
  constructor(partial?: any) {
    super();
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nanudaNo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  issuerName?: string;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsEnum(ORDER_BY_VALUE)
  @Expose()
  @IsOptional()
  @Default(ORDER_BY_VALUE.DESC)
  orderByPaymentListNo?: ORDER_BY_VALUE;
}
