import { BaseDto } from 'src/core';
import { Popup } from '../popup.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN, Default } from 'src/common';

export class AdminPopupDeleteDto extends BaseDto<AdminPopupDeleteDto>
  implements Partial<Popup> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @Expose()
  @IsEnum(YN)
  @Default(YN.NO)
  delYn?: YN;
}
