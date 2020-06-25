import { SpaceCreateDto } from './space-create.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { Space } from '../space.entity';
import { YN, Default } from 'src/common';
import { SPACE } from 'src/shared';

export class AdminSpaceCreateDto extends SpaceCreateDto
  implements Partial<Space> {
  constructor(partial?: any) {
    super(partial);
  }

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @Expose()
  @IsEnum(YN)
  @Default(YN.NO)
  showYn?: YN;

  @ApiPropertyOptional({ enum: YN })
  @IsOptional()
  @Expose()
  @IsEnum(YN)
  @Default(YN.NO)
  delYn?: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  manager?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @Default(YN.NO)
  lSubprimeYn?: YN;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  companyDistrictNo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  spaceScore?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  kbScore?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  grade?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  status?: SPACE;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  analysisStatus?: SPACE;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  analysisScore?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  brandListIds?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  promotionIds: number[];
}
