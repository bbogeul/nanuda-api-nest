import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NanudaUser } from './nanuda-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NanudaUser])],
})
export class NanudaUserModule {}
