import { ExternalServiceError } from "@app/errors/external-service.error";
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(ExternalServiceError)
export class ExternalServiceFilter implements ExceptionFilter {
  catch(exception: ExternalServiceError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    // in here we can do something with the error
    // i'm returning a json response 
    // but I could also call a log service

    response
      .status(400)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        http: {
          path: request.url,
          body: request.body,
        },
        name: 'ExternalServiceError',
        message: exception.message
      });
  }
}