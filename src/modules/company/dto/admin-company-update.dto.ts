import { BaseDto } from 'src/core';
import { Company } from '../company.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { COMPANY } from 'src/shared';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Default } from 'src/common';
import { Expose } from 'class-transformer';

export class AdminCompanyUpdateDto extends BaseDto<AdminCompanyUpdateDto>
  implements Partial<Company> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: COMPANY })
  @Default(COMPANY.OTHER_COMPANY)
  @IsEnum(COMPANY)
  @Expose()
  @IsOptional()
  companyType: COMPANY;

  //   관리자 아이디
  adminNo: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  nameKr: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  ceoKr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  ceoEng?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  population?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  businessNo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  fax?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  website?: string;
}
