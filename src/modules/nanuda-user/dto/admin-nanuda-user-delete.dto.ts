import { BaseDto } from 'src/core';
import { ApiProperty } from '@nestjs/swagger';
import { YN, Default } from 'src/common';
import { Expose } from 'class-transformer';
import { IsOptional, IsEnum } from 'class-validator';
import { NanudaUser } from '..';

export class AdminNanudaUserDeleteDto extends BaseDto<AdminNanudaUserDeleteDto>
  implements Partial<NanudaUser> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  delYN: YN;
}
