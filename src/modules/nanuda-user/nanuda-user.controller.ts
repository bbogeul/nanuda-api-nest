import { Controller } from '@nestjs/common';
import { BaseController } from '../../core';

@Controller()
export class NanudaUserController extends BaseController {
  constructor() {
    super();
  }
}
