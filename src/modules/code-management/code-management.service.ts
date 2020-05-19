import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeManagement } from './code-management.entity';
import { Repository } from 'typeorm';
import { AdminCodeManagementCreateDto, AdminCodeManagementListDto } from './dto';
import { NanudaException, BaseService } from '../../core';
import { PaginatedResponse, PaginatedRequest } from 'src/common';
import { AdminCodeManagementUpdateDto } from './dto/admin-code-management-update.dto';
// import * as generate from '../../generator';

@Injectable()
export class CodeManagementService extends BaseService {
    constructor(
        @InjectRepository(CodeManagement) private readonly codeManagementRepo: Repository<CodeManagement>
    ) {
        super()
    }

    /**
     * Create new code
     * @param adminCodeManagementCreateDto 
     */
    async create(adminCodeManagementCreateDto: AdminCodeManagementCreateDto): Promise<CodeManagement> {
        let newCode = new CodeManagement(adminCodeManagementCreateDto)
        // check if code exists first
        const checkCode = await this.codeManagementRepo.findOne({ KEY: newCode.KEY });
        if (checkCode) {
            throw new NanudaException('codeManagement.duplicate');
        }
        newCode = await this.codeManagementRepo.save(newCode);
        // await generate.generate;
        return newCode;
    }

    /**
     * get code list for admin
     * @param adminCodeManagementListDto 
     * @param pagination 
     */
    async findAll(adminCodeManagementListDto: AdminCodeManagementListDto, pagination?: PaginatedRequest): Promise<PaginatedResponse<CodeManagement>> {
        const [items, totalCount] = await this.codeManagementRepo
            .createQueryBuilder('CodeManagement')
            .WhereAndOrder(adminCodeManagementListDto)
            .Paginate(pagination)
            .getManyAndCount()
        return { items, totalCount }
    }

    /**
     * update existing code
     * @param codeNO 
     * @param adminCodeManagementUpdateDto 
     */
    async update(codeNO: number, adminCodeManagementUpdateDto: AdminCodeManagementUpdateDto): Promise<CodeManagement> {
        let code = await this.codeManagementRepo.findOne(codeNO);
        code = code.set(adminCodeManagementUpdateDto);
        code = await this.codeManagementRepo.save(code)
        return code;
    }
}