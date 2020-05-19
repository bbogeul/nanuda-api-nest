import { Controller, Post, Body, Get, Query, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { CodeManagementService } from './code-management.service'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../core';
import { AdminCodeManagementCreateDto, AdminCodeManagementListDto } from './dto';
import { CodeManagement } from './code-management.entity';
import { PaginatedRequest, PaginatedResponse } from '../../common';
import { AdminCodeManagementUpdateDto } from './dto/admin-code-management-update.dto';

// TODO: ADD GUARDS LOGIC
@ApiTags('ADMIN Code management')
@ApiBearerAuth()
@Controller()
export class AdminCodeManagementController extends BaseController {
    constructor(private readonly codeManagementService: CodeManagementService) {
        super();
    }

    /**
     * Create for admin
     * TODO: ADD GUARD
     * @param adminCodeManagementCreateDto 
     */
    @Post('/admin/code-management')
    async create(@Body() adminCodeManagementCreateDto: AdminCodeManagementCreateDto): Promise<CodeManagement> {
        return await this.codeManagementService.create(adminCodeManagementCreateDto)
    }

    /**
     * Get code list for admin
     * @param adminCodeManagementListDto 
     * @param pagination 
     */
    @Get('/admin/code-management')
    async findAll(
        @Query() adminCodeManagementListDto: AdminCodeManagementListDto,
        @Query() pagination: PaginatedRequest): Promise<PaginatedResponse<CodeManagement>> {
        return await this.codeManagementService.findAll(adminCodeManagementListDto, pagination)
    }

    /**
     * update existing code 
     * @param codeNO 
     * @param adminCodeManagementUpdateDto 
     */
    @ApiOperation({
        description: 'Update existing code'
    })
    @Patch('/admin/code-management/:id([0-9]+)')
    async update(
        @Param('id', ParseIntPipe) codeNO: number,
        @Body() adminCodeManagementUpdateDto: AdminCodeManagementUpdateDto
    ): Promise<CodeManagement> {
        return await this.codeManagementService.update(codeNO, adminCodeManagementUpdateDto)
    }

}
