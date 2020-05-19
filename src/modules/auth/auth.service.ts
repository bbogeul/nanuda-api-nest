import { BaseService, NanudaException } from '../../core';
import { Injectable } from '@nestjs/common';
import { PasswordService } from './password.service';
import { AdminLoginDto } from './dto';
import { Admin } from '../admin';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService extends BaseService {
    constructor(
        private readonly passwordService: PasswordService,
        @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
    ) {
        super()
    }

    async adminLogin(adminLoginDto: AdminLoginDto): Promise<Admin> {
        const admin = await this.adminRepo.findOne({ phone: adminLoginDto.phone });
        if (!admin) {
            throw new NanudaException('auth.notFound')
        }
        return admin;

    }

}