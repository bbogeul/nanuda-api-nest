import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceTypeBrandMapper } from './space-type-brand-mapper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceTypeBrandMapper])],
  controllers: [],
  providers: [],
})
export class SpaceTypeBrandMapperModule {}
