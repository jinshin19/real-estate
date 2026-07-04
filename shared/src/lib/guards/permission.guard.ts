// NestJs Imports
import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
// Constants
import { KEYS } from "../constants/key.contants.js";
import { RESPONSE_MESSAGES } from "../constants/response-messages.constants.js";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    @Inject(Reflector)
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userPermissions = ["user.get"];

    const requiredPermission = this.reflector.getAllAndOverride<string>(
      KEYS.PERMISSIONK,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermission) return true;

    const hasPermission = userPermissions.includes(requiredPermission);

    if (!hasPermission) {
      throw new UnauthorizedException(
        RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
      );
    }

    return true;
  }
}
