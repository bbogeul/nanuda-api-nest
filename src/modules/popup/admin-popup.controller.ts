import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/core';

@Controller()
@ApiBearerAuth()
@ApiTags('ADMIN Popup')
export class AdminPopupController extends BaseController {
  constructor() {
    super();
  }
}
