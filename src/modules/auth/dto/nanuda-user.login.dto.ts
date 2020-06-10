import { BaseDto } from '../../../core';
import { NanudaUser } from '../../../modules/nanuda-user';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NanudaUserLoginDto extends BaseDto<NanudaUserLoginDto>
  implements Partial<NanudaUser> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @Expose()
  phone: string;
}
