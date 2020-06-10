import { Controller } from '@nestjs/common';
import { BaseController } from 'src/core';

@Controller()
export class MenuController extends BaseController {
  constructor() {
    super();
  }
}
