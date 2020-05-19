import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express';
import { ERROR_TYPE, ErrorResponse } from '..';

@Catch()
export class AllExceptionFilters implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        // i am not sure if i even need this ....
        if (process.env.NODE_ENV !== 'production') {
            console.log(exception)
        }
        const errorResponse: ErrorResponse = {
            code: exception.name,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            type: ERROR_TYPE.SERVER,
            message: `Unhandled error exception ${exception.message}`,
        };
        res.status(errorResponse.statusCode).json({
            ...errorResponse,
            timestamp: new Date().toISOString(),
            path: req.url
        });
        return null
    }
}