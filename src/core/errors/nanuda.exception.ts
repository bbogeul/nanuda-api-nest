import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class NanudaException extends BaseException {
  /**
 
   * @param message 
   * @param message
   * @param message
   * @param message
   */

  constructor(code: string);
  constructor(code: string, value: object);
  constructor(code: string, message: string);
  constructor(code: string, message: string, value: object);
  constructor(code: string, message?: string | object, value?: object) {
    console.log(
      code,
      'nanuda - exception',
      typeof code,
      typeof message,
      typeof value,
    );
    if (typeof message === 'string') {
      super(HttpStatus.NOT_ACCEPTABLE, code, message, value);
    } else if (typeof message === 'object') {
      super(HttpStatus.NOT_ACCEPTABLE, code, undefined, message);
    } else {
      super(HttpStatus.NOT_ACCEPTABLE, code, message, value);
    }
  }
}
