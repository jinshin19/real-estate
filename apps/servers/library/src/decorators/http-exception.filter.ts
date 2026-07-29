// NestJs Imports
import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from "@nestjs/common";
import { Response } from "express";
// Handlers
import { ResponseHandlerService } from "../handlers/response.handler.js";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    {
      let message: string = "";
      const context = host.switchToHttp();
      const status = exception.getStatus();
      const response = context.getResponse<Response>();

      const errorResponse = exception.getResponse() as
        | string
        | HttpExceptionFilterResponseI;

      if (typeof errorResponse === "string") {
        message = errorResponse;
      }

      if (typeof errorResponse === "object") {
        if (Array.isArray(errorResponse.message)) {
          message = errorResponse.message[0];
        }
        message = errorResponse.message as string;
      }

      if (status === HttpStatus.NOT_FOUND) {
        response.status(HttpStatus.NOT_FOUND).json(
          ResponseHandlerService({
            status:
              typeof errorResponse !== "string"
                ? errorResponse?.statusCode
                : status,
            success: false,
            message,
          }),
        );
      }

      if (status === HttpStatus.BAD_REQUEST) {
        response.status(HttpStatus.BAD_REQUEST).json(
          ResponseHandlerService({
            status:
              typeof errorResponse !== "string"
                ? errorResponse?.statusCode
                : status,
            success: false,
            message,
          }),
        );
      }

      if (status === HttpStatus.UNAUTHORIZED) {
        response.status(HttpStatus.UNAUTHORIZED).json(
          ResponseHandlerService({
            status:
              typeof errorResponse !== "string"
                ? errorResponse?.statusCode
                : status,
            success: false,
            message,
          }),
        );
      }

      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
          ResponseHandlerService({
            status:
              typeof errorResponse !== "string"
                ? errorResponse?.statusCode
                : status,
            success: false,
            message,
          }),
        );
      }
    }
  }
}

interface HttpExceptionFilterResponseI {
  error?: string;
  statusCode: number;
  message?: string | string[];
  response?: any;
}
