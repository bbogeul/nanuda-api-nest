import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceType } from './space-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceType])],
  controllers: [],
  providers: [],
})
export class SpaceTypeModule {}
