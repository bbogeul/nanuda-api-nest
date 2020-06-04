import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NanudaUserUpdateHistory } from './nanuda-user-update-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NanudaUserUpdateHistory]),
    // TypeOrmModule.forRoot({ name: 'database1' }),
  ],
  controllers: [],
  providers: [],
})
export class NanudaUserUpdateHistoryModule {}
