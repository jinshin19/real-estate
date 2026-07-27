// NestJs Imports
import { Observable } from "rxjs";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
// Services
import { JWTService } from "../services/index.js";
// Utils
import { ExtractUserRoleU } from "../utils/roles-permissions.utils.js";
import { ExtractAccessTokenU } from "../utils/header.utils.js";
// Constants
import { KEYS } from "../constants/key.contants.js";
import { RESPONSE_MESSAGES } from "../constants/response-messages.constants.js";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JWTService,
  ) {}

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

    const decodedToken = this.jwtService.decodeToken(token);

    const requiredRoles = this.reflector.get<string[]>(
      KEYS.ROLESK,
      context.getHandler(),
    );

    const extractedRole = ExtractUserRoleU(decodedToken.data ?? null);

    if (!extractedRole) {
      throw new UnauthorizedException(
        RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
      );
    }

    const hasRoles = requiredRoles.includes(extractedRole);

    if (!hasRoles) {
      throw new UnauthorizedException(
        RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
      );
    }

    return true;
  }
}
