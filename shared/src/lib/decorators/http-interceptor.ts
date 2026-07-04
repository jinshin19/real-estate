// NestJs Imports
import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
// Shared
import {
  // Handlers
  ResponseHandlerService,
} from "../handlers/response.handler.js";

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const http = context.switchToHttp();
    // const request = http.getRequest();
    const response = http.getResponse();

    return next.handle().pipe(
      map((data) => {
        response.status(data?.status || 500);
        return ResponseHandlerService({
          status: data?.status,
          success: false,
          message: data?.message,
          ...(data?.data ? { data: data?.data } : {}),
        });
      }),
    );
  }
}
