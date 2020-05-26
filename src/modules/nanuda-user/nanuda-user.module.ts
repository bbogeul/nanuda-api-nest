import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NanudaUser } from './nanuda-user.entity';
import { NanudaUserUpdateHistory } from '../nanuda-user-update-history';
import { NanudaUserController } from './nanuda-user.controller';
import { NanudaUserService } from './nanuda-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([NanudaUser, NanudaUserUpdateHistory])],
  controllers: [NanudaUserController],
  providers: [NanudaUserService],
  exports: [],
})
export class NanudaUserModule {}
