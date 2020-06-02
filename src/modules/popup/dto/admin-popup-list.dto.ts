import { BaseDto } from 'src/core';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { Popup } from '../popup.entity';
import { LINK_TYPE, POPUP } from 'src/shared';
import { Default, YN, ORDER_BY_VALUE } from 'src/common';

export class AdminPopupListDto extends BaseDto<AdminPopupListDto>
  implements Partial<Popup> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  title?: string;

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

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  delYn: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  showYn: YN;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsOptional()
  @Default(ORDER_BY_VALUE.DESC)
  @IsEnum(ORDER_BY_VALUE)
  @Expose()
  orderByNO: ORDER_BY_VALUE;
}
