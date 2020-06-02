import { BaseDto } from '../../../core';
import { NanudaUser } from '../nanuda-user.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumberString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { YN, Default } from 'src/common';

export class NanudaUserUpdateDto extends BaseDto<NanudaUserUpdateDto> {
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

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  infoYn: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  serviceYn: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  marketYn: YN;
}
