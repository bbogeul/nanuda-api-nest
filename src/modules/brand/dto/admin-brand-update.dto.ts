import { BaseDto } from 'src/core';
import { Brand } from '../brand.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class AdminBrandUpdateDto extends BaseDto<AdminBrandUpdateDto>
  implements Partial<Brand> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  nameEng?: string;
}
