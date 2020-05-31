import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NanudaUser } from './nanuda-user.entity';
import { NanudaUserUpdateHistory } from '../nanuda-user-update-history';
import { NanudaUserController } from './nanuda-user.controller';
import { NanudaUserService } from './nanuda-user.service';
import { AdminNanudaUserController } from './admin-nanuda-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NanudaUser, NanudaUserUpdateHistory])],
  controllers: [NanudaUserController, AdminNanudaUserController],
  providers: [NanudaUserService],
  exports: [],
})
export class NanudaUserModule {}
