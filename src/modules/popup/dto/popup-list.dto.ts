import { Popup } from '../popup.entity';
import { BaseDto } from '../../../core';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { YN, Default, ORDER_BY_VALUE } from 'src/common';
import { IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';

export class PopupListDto extends BaseDto<PopupListDto>
  implements Partial<Popup> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @Default(YN.YES)
  @Expose()
  showYn: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @Default(YN.NO)
  @Expose()
  delYn: YN;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @IsEnum(ORDER_BY_VALUE)
  @Default(ORDER_BY_VALUE.DESC)
  @Expose()
  orderByNo: ORDER_BY_VALUE;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @Expose()
  @Default(new Date())
  currented?: Date;
}
