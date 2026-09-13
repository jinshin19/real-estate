// NestJs Imports
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
// Types
import { type TokenPayloadI } from '../../interfaces/src/token-payload.interfaces';
// Constants
import { ROLEC } from '../../constants';
import { RESPONSE_MESSAGES } from '../../constants/src/response-messages.constants';

export const ExtractUserU = (token: string): TokenPayloadI | null => {
  if (!token) {
    console.error('ExtractUserU - No token provided', !token);
    return null;
  }
  try {
    const decodedToken = jwt.decode(token) as TokenPayloadI;

    const userRole = decodedToken.role;

    if (userRole === ROLEC.client) return decodedToken;

    const verifiedToken = jwt?.verify(
      token,
      process.env.JINSHIN19_REAL_ESTATE_JWT_SECRET_KEY!,
    );

    return verifiedToken as TokenPayloadI;
  } catch (error) {
    console.log('ExtractUserU', error);
    throw new UnauthorizedException(RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED);
  }
};
