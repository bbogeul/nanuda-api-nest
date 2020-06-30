import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NanudaUser } from './nanuda-user.entity';
import { NanudaUserUpdateHistory } from '../nanuda-user-update-history';
import { NanudaUserController } from './nanuda-user.controller';
import { NanudaUserService } from './nanuda-user.service';
import { AdminNanudaUserController } from './admin-nanuda-user.controller';
import { SmsAuth } from '../sms-auth/sms-auth.entity';
import { MessagingService } from 'src/shared/message-body.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NanudaUser, NanudaUserUpdateHistory, SmsAuth]),
  ],
  controllers: [AdminNanudaUserController, NanudaUserController],
  providers: [NanudaUserService, MessagingService],
})
export class NanudaUserModule {}
