import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NanudaUserUpdateHistory } from './nanuda-user-update-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NanudaUserUpdateHistory])],
  controllers: [],
  providers: [],
})
export class NanudaUserUpdateHistoryModule {}
