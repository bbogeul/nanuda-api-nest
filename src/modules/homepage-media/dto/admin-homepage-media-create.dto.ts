import { BaseDto } from 'src/core';
import { HomepageMedia } from '../homepage-media.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN, Default } from 'src/common';

export class AdminHomepageMediaCreateDto
  extends BaseDto<AdminHomepageMediaCreateDto>
  implements Partial<HomepageMedia> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  originalUrl?: string;

  //   set url inside the service method

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @Expose()
  @IsEnum(YN)
  @Default(YN.NO)
  showYn?: YN;
}
