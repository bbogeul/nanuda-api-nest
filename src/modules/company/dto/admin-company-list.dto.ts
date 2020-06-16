import { BaseDto } from 'src/core';
import { Company } from '../company.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { COMPANY } from 'src/shared';

export class AdminCompanyListDto extends BaseDto<AdminCompanyListDto>
  implements Partial<Company> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: COMPANY })
  @IsOptional()
  @Expose()
  @IsEnum(COMPANY)
  companyType?: COMPANY;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameKr?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  email?: string;
}
