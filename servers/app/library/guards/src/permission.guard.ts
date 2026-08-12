// NestJs Imports
import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
// Service
import { JWTService } from '../../services';
// Utils
import { ExtractAccessTokenU } from '../../utils';
// Constants
import { KEYS } from '../../constants/src/key.contants';
// Constants
import { RESPONSE_MESSAGES } from '../../constants/src/response-messages.constants';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    @Inject(Reflector)
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

    const userPermissions = decodedToken.data?.permissions;

    const requiredPermission = this.reflector.get<string[]>(
      KEYS.PERMISSIONK,
      context.getHandler(),
    );

    if (!requiredPermission) return false;

    const hasPermission = requiredPermission.some((permission) =>
      userPermissions?.includes(permission),
    );

    if (!hasPermission) {
      throw new UnauthorizedException(
        RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
      );
    }

    return true;
  }
}
