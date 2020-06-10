import { BaseDto } from '../../../core';
import { NanudaUser } from '..';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { NANUDA_USER } from '../../../shared';
import { YN, ORDER_BY_VALUE, Default } from '../../../common';

export class AdminNanudaUserListDto extends BaseDto<AdminNanudaUserListDto>
  implements Partial<NanudaUser> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @IsNumberString()
  phone?: string;

  @ApiPropertyOptional({ enum: NANUDA_USER })
  @IsOptional()
  @IsEnum(NANUDA_USER)
  @Expose()
  authCode: NANUDA_USER;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Expose()
  infoYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Expose()
  marketYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Expose()
  serviceYn?: YN;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsOptional()
  @Default(ORDER_BY_VALUE.DESC)
  @IsEnum(ORDER_BY_VALUE)
  @Expose()
  orderByNo: ORDER_BY_VALUE;
}
