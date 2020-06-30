import { BaseDto } from 'src/core';
import { SmsAuth } from 'src/modules/sms-auth/sms-auth.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { Expose } from 'class-transformer';

export class NanudaUserGetAuthDto extends BaseDto<NanudaUserGetAuthDto>
  implements Partial<SmsAuth> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @Expose()
  phone: string;
}
