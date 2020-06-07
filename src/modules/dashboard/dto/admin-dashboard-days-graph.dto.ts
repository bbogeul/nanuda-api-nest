import { BaseDto } from 'src/core';
import { PaymentList } from '../dashboard.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Default } from 'src/common';
import { Expose } from 'class-transformer';

export class AdminDashboardDayGraphDto extends BaseDto<
  AdminDashboardDayGraphDto
> {
  constructor() {
    super();
  }

  @ApiPropertyOptional()
  @IsNumber()
  @Default(10)
  @Expose()
  @IsOptional()
  days?: number;
}
