import { BaseDto } from '../../../core';
import { Admin } from '../../../modules/admin';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AdminLoginDto extends BaseDto<AdminLoginDto> implements Partial<Admin> {
    constructor(partial?: any) {
        super(partial)
    }

    @ApiProperty()
    @Expose()
    phone: string;

    @ApiProperty()
    @Expose()
    password: string;
}