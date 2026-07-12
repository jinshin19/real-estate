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
// Utils
import { ExtractAccessTokenU } from "../utils/header.utils.js";
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
    const token = ExtractAccessTokenU(request);

    if (!token) {
      throw new UnauthorizedException(
        RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
      );
    }

    const validatedToken = this.jwtService.validateToken(token);

    if (!validatedToken.success) {
      throw new UnauthorizedException(
        RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
      );
    }

    return true;
  }
}
