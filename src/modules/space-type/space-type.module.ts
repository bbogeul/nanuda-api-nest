import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceType } from './space-type.entity';
import { SpaceTypeService } from './space-type.service';
import { AdminSpaceTypeController } from './admin-space-type.controller';
import { SpaceTypeBrandMapper } from '../space-type-brand-mapper/space-type-brand-mapper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceType, SpaceTypeBrandMapper])],
  controllers: [AdminSpaceTypeController],
  providers: [SpaceTypeService],
})
export class SpaceTypeModule {}
