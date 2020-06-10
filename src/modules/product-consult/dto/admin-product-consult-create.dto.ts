import { BaseDto } from 'src/core';
import { ProductConsult } from '../product-consult.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsEnum,
  IsOptional,
  IsNumberString,
  IsDateString,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { PRODUCT_CONSULT, AVAILABLE_TIME } from 'src/shared';
import { Default, YN } from 'src/common';

export class AdminProductConsultCreateDto
  extends BaseDto<AdminProductConsultCreateDto>
  implements Partial<ProductConsult> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @Expose()
  @IsNumber()
  nanudaUserNo: number;

  @ApiPropertyOptional({ enum: PRODUCT_CONSULT })
  @IsEnum(PRODUCT_CONSULT)
  @IsOptional()
  @Default(PRODUCT_CONSULT.P_NEW_REG)
  @Expose()
  status?: PRODUCT_CONSULT;

  @ApiPropertyOptional()
  @Expose()
  @IsNumber()
  @IsOptional()
  pConsultManager?: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @Expose()
  @IsDateString()
  confirmDate: Date;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  @Expose()
  hopeDate?: Date;

  @ApiPropertyOptional({ enum: AVAILABLE_TIME })
  @Expose()
  @IsOptional()
  @IsEnum(AVAILABLE_TIME)
  hopeTime?: AVAILABLE_TIME;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  pConsultEtc?: string;

  @ApiPropertyOptional({ enum: YN })
  @Expose()
  @IsEnum(YN)
  changUpExpYn?: YN;
}
