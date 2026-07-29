// NestJs Imports
import {
  Injectable,
  HttpStatus,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
// Library
import {
  // Handlers
  ResponseHandlerService,
} from "../handlers/response.handler";
// Utils
import {
  ExtractAccessTokenU,
  ExtractRefreshTokenU,
} from "../utils/header.utils";
// Constants
import { RESPONSE_MESSAGES } from "../constants/response-messages.constants";
import { ExtractUserU } from "../utils/token.utils";

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const response = http.getResponse();
    const classController = context.getClass();
    const handler = context.getHandler();

    const headers = request.headers;

    const accessToken = ExtractAccessTokenU(request);

    console.log("accessToken", accessToken);

    if (accessToken) {
      const user = ExtractUserU(accessToken);
      headers["token-payload"] = user;
    }

    if (
      classController.name === "AuthController" &&
      handler.name === "refresh"
    ) {
      const token = ExtractRefreshTokenU(request);

      if (!token) {
        return next.handle().pipe(
          map((data) => {
            response.status(data?.status || 500);
            return ResponseHandlerService({
              status: HttpStatus.UNAUTHORIZED,
              success: false,
              message: RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
            });
          }),
        );
      }

      headers["refresh-token"] = token;
    }

    // CREATE SAME USER AGENT CONDITION HERE OR DO GUARDS

    return next.handle().pipe(
      map((data) => {
        response.status(data?.status || 500);
        return ResponseHandlerService({
          status: data?.status,
          success: data?.success,
          message: data?.message,
          ...(data?.data ? { data: data?.data } : {}),
        });
      }),
    );
  }
}
