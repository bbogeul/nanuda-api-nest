import { Controller, Query, Get } from '@nestjs/common';
import { PopupService } from './popup.service';
import { BaseController } from 'src/core';
import { PaginatedRequest, PaginatedResponse } from 'src/common';
import { Popup } from './popup.entity';
import { PopupListDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('NANUDA POPUP')
export class PopupController extends BaseController {
  constructor(private readonly popupService: PopupService) {
    super();
  }

  /**
   * get popup for home
   * @param popupListDto
   * @param pagination
   */
  @Get('/popup')
  async findAll(
    @Query() popupListDto: PopupListDto,
    @Query() pagination: PaginatedRequest,
  ): Promise<PaginatedResponse<Popup>> {
    return await this.popupService.findForHomepage(popupListDto, pagination);
  }
}
