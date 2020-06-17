import { BaseDto } from 'src/core';
import { Company } from '../company.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsObject } from 'class-validator';

export class AdminCompanyDistrictCreateDto
  extends BaseDto<AdminCompanyDistrictCreateDto>
  implements Partial<Company> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  nameKr: string;

  companyNo: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  address?: string;
}
