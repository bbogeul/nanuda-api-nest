import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/core';
import { HomepageMedia } from './homepage-media.entity';
import { HomepageMediaService } from './homepage-media.service';

@Controller()
@ApiTags('NANUDA HOMEPAGE')
export class HomepageMediaController extends BaseController {
  constructor(private readonly homepageMediaService: HomepageMediaService) {
    super();
  }

  /**
   * find for homepage
   */
  @Get('/homepage-media/youtube')
  async findYoutube(): Promise<HomepageMedia> {
    return await this.homepageMediaService.findForHomepageYoutube();
  }
}
