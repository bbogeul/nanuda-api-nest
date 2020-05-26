import { BaseDto } from '../../../core';
import { NanudaUser } from '../nanuda-user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumberString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { YN, Default } from 'src/common';

export class NanudaUserCreateDto extends BaseDto<NanudaUserCreateDto>
  implements Partial<NanudaUser> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  //   문자열이지만 숫자만 들어있는 거 체크함
  @IsNumberString()
  @IsOptional()
  @Expose()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
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
