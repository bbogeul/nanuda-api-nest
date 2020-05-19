import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeManagement } from './code-management.entity';
import { CodeManagementService } from './code-management.service';
import { AdminCodeManagementController } from './admin-code-management.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CodeManagement])],
    controllers: [AdminCodeManagementController],
    providers: [CodeManagementService]
})

export class CodeManagementModule { }