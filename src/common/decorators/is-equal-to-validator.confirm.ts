/* eslint-disable @typescript-eslint/ban-types */
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import { NanudaException } from '../../core';

export const isEqualTo = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: {
        message:
          new NanudaException('auth.passwordNotEqual') ||
          '비밀번호가 일치하지 않습니다',
        ...validationOptions,
      },
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) {
            return false;
          }
          const [newPasswordAttempt] = args.constraints;
          const newPassword = (args.object as any)[newPasswordAttempt];
          if (newPassword !== value) {
            return false;
          }
          return true;
        },
      },
    });
  };
};
