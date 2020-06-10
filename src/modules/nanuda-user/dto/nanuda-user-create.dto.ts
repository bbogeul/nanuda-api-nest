import { BaseDto } from '../../../core';
import { NanudaUser } from '../nanuda-user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsNotEmpty, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN, Default } from 'src/common';

export class NanudaUserCreateDto extends BaseDto<NanudaUserCreateDto>
  implements Partial<NanudaUser> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  //   문자열이지만 숫자만 들어있는 거 체크함
  @IsNumberString()
  @Expose()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty({ enum: YN })
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  infoYn: YN;

  @ApiProperty({ enum: YN })
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  serviceYn: YN;

  @ApiProperty({ enum: YN })
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  marketYn: YN;
}
