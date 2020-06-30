import { BaseDto } from 'src/core';
import { ProductConsult } from '../product-consult.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Expose } from 'class-transformer';
import { PRODUCT_CONSULT, AVAILABLE_TIME, SPACE_TYPE } from 'src/shared';
import { YN } from 'src/common';

export class AdminProductConsultUpdateDto
  extends BaseDto<AdminProductConsultUpdateDto>
  implements Partial<ProductConsult> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nanudaUserNo?: number;

  @ApiPropertyOptional({ enum: PRODUCT_CONSULT })
  @IsEnum(PRODUCT_CONSULT)
  @IsOptional()
  @Expose()
  status?: PRODUCT_CONSULT;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  pConsultManager?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  productId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  //   @IsDateString()
  @Expose()
  hopeDate?: Date;

  @ApiPropertyOptional({ enum: AVAILABLE_TIME })
  @Expose()
  @IsEnum(AVAILABLE_TIME)
  @IsOptional()
  hopeTime?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  pConsultEtc?: string;

  @ApiPropertyOptional({ enum: YN })
  @IsEnum(YN)
  @IsOptional()
  @Expose()
  changUpExpYn?: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  spaceTypeNo?: SPACE_TYPE;
}
