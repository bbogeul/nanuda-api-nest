import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

/* exception.message {
  statusCode: 400,
  error: 'Bad Request',
  message: [
    ValidationError {
      target: [BuyerFindEmailDto],
      value: 'string',
      property: 'mobile',
      children: [],
      constraints: {
        isNotEmpty: 'first name should not be empty'
      }
    },
    ValidationError {
      target: [BuyerFindEmailDto],
      value: 'string',
      property: 'mobile',
      children: [],
      constraints: {
        IsCustomPhoneNumber: 'must be a valid mobile number'
      }
    }
  ]
} */

/* exception.message {
  "statusCode": 400,
  "error": "Bad Request",
  "message": [
    ValidationError {
      "property": "mobile",
      "children": [],
      "constraints": {
        "isCustomPhoneNumber": "Must be a valid mobile number"
      }
    },
    ValidationError {
      "property": "buyerCompany",
      "children": [
        {
          "property": "phone",
          "children": [],
          "constraints": {
            "isCustomPhoneNumber": "Must be a valid phone number"
          }
        }
      ]
    }
  ]
}

function messageValueStringToArray(message) {
  const result = {};
  Object.keys(message).forEach(key => {
    result[key] =
      typeof message[key] === 'string' ? [message[key]] : message[key];
  });
  return result;
}
*/

export class BadFieldsException extends BaseException {
  /**
   * TODO: change syntex
   * @param message {
   *    email: { emailNotExist: `No user found for email.` },
   *  }
   * @param message {'email.notExist': `No user found for email`}
   * @param message 'email.notExist', `No user found for email`
   * @param message 'email', {'notExist': `No user found for email`}
   */
  // constructor(field: string, message: string | TemplateStringsArray);
  // constructor(
  //   messages: string | {
  //     [field: string]: { [validatorName: string]: string | TemplateStringsArray }
  //   },
  // message?: string | TemplateStringsArray )
  constructor(code: string, message?: string, value?: object) {
    super(HttpStatus.BAD_REQUEST, code, message, value);
  }
}
