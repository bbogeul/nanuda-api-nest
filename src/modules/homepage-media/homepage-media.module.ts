import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomepageMedia } from './homepage-media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomepageMedia])],
  controllers: [],
  providers: [],
})
export class HomepageMediaModule {}
