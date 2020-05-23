import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NanudaUser } from './nanuda-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NanudaUser])],
  controllers: [],
  providers: [],
  exports: []
})
export class NanudaUserModule {}
