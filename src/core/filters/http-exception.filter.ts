// import { BadFieldsException } from '../errors/bad-fields.exception';
// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, BadRequestException, HttpStatus } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { ValidationError } from 'class-validator';
// import { BaseException, ErrorResponse, ERROR_TYPE, FieldError } from '../errors';
// import { I18nService } from 'nestjs-i18n';
// import * as errors from '../../locales/en/errors.json';
// // import { GqlArgumentsHost } from '@nestjs/graphql';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   constructor(private readonly i18n: I18nService) { }

//   trans(code: string, args?: object, defaultMessage?: string) {
//     try {
//       const message = this.i18n.translate('errors.' + code, { args });
//       return `errors.${code}` === message ? defaultMessage : message;
//     } catch (e) {
//       console.log(e);
//       return defaultMessage;
//     }
//   }

//   makeValidationError(errors: { [key: string]: FieldError }, validationErrors: ValidationError[], property?: string) {
//     console.log('makeValidationError :: --- ', validationErrors);
//     return validationErrors.reduce((acc, cur, i) => {
//       const key = property ? `${property}.${cur.property}` : cur.property;
//       if (cur.children.length > 0) {
//         this.makeValidationError(acc, cur.children as ValidationError[], key);
//       } else {
//         const k = Object.keys(cur.constraints)[0];
//         const message =
//           this.trans(`validator.${key}.${k}`) || this.trans(`validator.${key}`, undefined, cur.constraints[k]);
//         acc[key] = { validator: k, message };
//       }
//       return acc;
//     }, errors);
//   }

//   async catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const res = ctx.getResponse<Response>();
//     const req = ctx.getRequest<Request>();

//     let errorResponse: ErrorResponse;

//     if (exception instanceof BaseException) {
//       console.log(exception);
//       errorResponse = exception.getResponse();
//       errorResponse.message =
//         errorResponse.message || this.trans(errorResponse.code, errorResponse.value, errorResponse.code);
//     } else if (exception instanceof BadRequestException) {
//       // only validation.pipe

//       const response = exception.getResponse() as any;
//       console.log('response : ', response, response.message);
//       const validationErrors = response.message as ValidationError[];
//       const errors = this.makeValidationError({}, validationErrors);

//       console.log(errors);

//       errorResponse = {
//         code: 'validator',
//         type: ERROR_TYPE.VALIDATOR,
//         statusCode: exception.getStatus(),
//         message: errors[Object.keys(errors)[0]].message,
//         errors,
//       };
//     } else {
//       errorResponse = {
//         code: exception.name,
//         type: ERROR_TYPE.SERVER,
//         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
//         message: exception.message.error,
//       };
//     }

//     res.status(exception.getStatus()).json({
//       ...errorResponse,
//       timestamp: new Date().toISOString(),
//       path: req.url,
//     });
//     return;

//     // graphql 요청 에러 처리
//     /*
//     if (!req || typeof res.status !== 'function') {
//       // const gqlHost = GqlArgumentsHost.create(host);
//       return exception;
//     }
//     */

//     // convert ValidationError of BadRequestException to BadFieldsException
//     /* TODO: ???
//     if (exception instanceof BadRequestException) {
//       // class-validator ValidationError
//       const validationErrors = exception.message.message;
//       if (
//         validationErrors instanceof Array &&
//         validationErrors[0] instanceof ValidationError
//       ) {
//         const message = recursivelyValidationErrorIterate(validationErrors);
//         exception = new BadFieldsException(message);
//       }
//     }
//     */

//     // errorResponse =
//     //   typeof errorResponse === 'string'
//     //     ? { statusCode: status, message: errorResponse }
//     //     : errorResponse;

//     // if (exception instanceof BadFieldsException) {
//     //   res.status(status).json(errorResponse);
//     //   return;
//     // }
//   }
// }
