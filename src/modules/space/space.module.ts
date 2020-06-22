import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './space.entity';
import { AdminSpaceController } from './admin-space.controller';
import { SpaceService } from './space.service';

@Module({
  imports: [TypeOrmModule.forFeature([Space])],
  controllers: [AdminSpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}
