// NestJs Imports
import { Observable } from 'rxjs';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
// Services
import { JWTService } from '../../services';
// Utils
import { ExtractAccessTokenU, ExtractRefreshTokenU } from '../../utils';
// Constants
import { RESPONSE_MESSAGES } from '../../constants/src/response-messages.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JWTService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const accessToken = ExtractAccessTokenU(request);
    const refreshToken = ExtractRefreshTokenU(request);

    const rotationToken = this.jwtService.rotationToken(
      accessToken!,
      refreshToken!,
    );

    if (
      (!rotationToken.accessToken && !rotationToken.isValid) ||
      !rotationToken.isValid
    ) {
      throw new UnauthorizedException(
        RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
      );
    }

    return true;
  }
}
