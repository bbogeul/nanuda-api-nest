import { BaseDto } from 'src/core';
import { Popup } from '../popup.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsEnum } from 'class-validator';
import { YN } from 'src/common';

export class AdminPopupUpdateDto extends BaseDto<AdminPopupUpdateDto>
  implements Partial<Popup> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  subTitle?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({ enum: YN })
  @Expose()
  @IsEnum(YN)
  @IsOptional()
  showYn?: YN;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  started: Date;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  ended: Date;
}
