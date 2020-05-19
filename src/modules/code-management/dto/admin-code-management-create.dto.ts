import { Expose } from 'class-transformer';
import { BaseDto } from '../../../core';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CodeManagement } from '../code-management.entity';
import { Default, deleteYN } from '../../../common';
import { IsOptional, IsEnum, IsNotEmpty } from 'class-validator';

export class AdminCodeManagementCreateDto extends BaseDto<AdminCodeManagementCreateDto> implements Partial<CodeManagement>{
    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    KEY: string;

    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    VALUE: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Expose()
    DESC?: string;

    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    CATEGORY_1: string;

    @ApiProperty()
    @IsNotEmpty()
    @Expose()
    CATEGORY_2: string;

    @ApiProperty({ enum: deleteYN, enumName: 'deleteYN' })
    @Default(deleteYN.NO)
    @IsEnum(deleteYN)
    @Expose()
    DEL_YN: deleteYN;
}