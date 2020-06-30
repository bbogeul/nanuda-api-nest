import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomepageMedia } from './homepage-media.entity';
import { HomepageMediaService } from './homepage-media.service';
import { AdminHomepageMediaController } from './admin-homepage-media.controller';
import { HomepageMediaController } from './homepage-media.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HomepageMedia])],
  controllers: [AdminHomepageMediaController, HomepageMediaController],
  providers: [HomepageMediaService],
})
export class HomepageMediaModule {}
