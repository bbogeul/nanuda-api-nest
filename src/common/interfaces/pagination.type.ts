import { Min, Max } from 'class-validator';
import { Type, Expose } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Default } from '../decorators';

export class PaginatedResponse<T> {
  items: T[];

  totalCount: number;
}

export class PaginatedRequest {
  @ApiPropertyOptional()
  @Type(() => Number)
  @Min(0)
  @Max(80)
  @Expose()
  @Default(20)
  take?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @Min(0)
  @Expose()
  @Default(0)
  skip?: number;
}
