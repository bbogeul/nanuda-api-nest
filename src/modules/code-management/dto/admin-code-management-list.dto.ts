import { BaseDto } from '../../../core';
import { CodeManagement } from '../code-management.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { ORDER_BY_VALUE, Default } from '../../../common';
import { Expose } from 'class-transformer';

export class AdminCodeManagementListDto extends BaseDto<AdminCodeManagementListDto> implements Partial<CodeManagement> {
    constructor(partial?: any) {
        super(partial)
    }

    @ApiPropertyOptional()
    @IsOptional()
    @Expose()
    KEY?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Expose()
    VALUE?: string;

    @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
    @Default(ORDER_BY_VALUE.DESC)
    @IsOptional()
    @IsEnum(ORDER_BY_VALUE)
    @Expose()
    orderByNO?: ORDER_BY_VALUE
}