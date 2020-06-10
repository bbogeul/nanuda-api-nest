import { BaseDto } from '../../../core';
import { CodeManagement } from '../code-management.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
import { YN } from 'src/common';

export class AdminCodeManagementUpdateDto extends BaseDto<AdminCodeManagementUpdateDto> implements Partial<CodeManagement> {
    constructor(partial?: any) {
        super(partial)
    }

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @Expose()
    KEY?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @Expose()
    VALUE?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @Expose()
    DESC?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @Expose()
    CATEGORY_1?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @Expose()
    CATEGORY_2?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @Expose()
    ORDER_BY?: number

    @ApiPropertyOptional({ enum: YN })
    @IsOptional()
    @IsEnum(YN)
    @IsNotEmpty()
    @Expose()
    DEL_YN?: YN;
}