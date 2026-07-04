// NestJs Imports
import { Observable } from "rxjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const response = http.getResponse();
    console.log("", {
      request,
      response,
    });

    return true;
  }
}
