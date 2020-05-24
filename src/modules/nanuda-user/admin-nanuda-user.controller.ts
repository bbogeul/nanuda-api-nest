import { Controller } from '@nestjs/common';
import { BaseController } from '../../core';

@Controller()
export class AdminNanudaUserController extends BaseController {
  constructor() {
    super();
  }
}
