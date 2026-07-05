// NestJs Imports
import { Observable } from "rxjs";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
// Services
import { JWTService } from "../services/index.js";
// Constants
import { RESPONSE_MESSAGES } from "../constants/response-messages.constants.js";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JWTService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest();

    const authorization = request?.headers?.authorization ?? null;

    if (!authorization) {
      throw new UnauthorizedException(
        RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
      );
    }

    const accessToken = authorization.replace("Bearer ", "") ?? null;

    const validatedToken = this.jwtService.validateToken(accessToken);

    if (!validatedToken.success) {
      throw new UnauthorizedException(
        RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
      );
    }

    return true;
  }
}
