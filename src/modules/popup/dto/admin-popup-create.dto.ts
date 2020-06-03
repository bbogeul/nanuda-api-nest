import { BaseDto } from 'src/core';
import { Popup } from '../popup.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { LINK_TYPE, POPUP } from 'src/shared';
import { Default, YN } from 'src/common';

export class AdminPopupCreateDto extends BaseDto<AdminPopupCreateDto>
  implements Partial<Popup> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  subTitle?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  link?: string;

  @ApiPropertyOptional({ enum: LINK_TYPE })
  @IsOptional()
  @IsEnum(LINK_TYPE)
  @Expose()
  linkType?: LINK_TYPE;

  @ApiPropertyOptional({ enum: POPUP })
  @IsEnum(POPUP)
  @IsOptional()
  @Expose()
  @Default(POPUP.IMAGE)
  popupType?: POPUP;

  @ApiProperty({ enum: YN })
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  delYn: YN;

  @ApiProperty({ enum: YN })
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  showYn: YN;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  started: Date;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  ended: Date;
}
