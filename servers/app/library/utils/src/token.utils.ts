// NestJs Imports
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
// Constants
import { ROLEC } from '../../constants';
import { KEYS } from '../../constants/src/key.contants';
import { RESPONSE_MESSAGES } from '../../constants/src/response-messages.constants';
// Types
import { type TokenPayloadI } from '../../interfaces/src/token-payload.interfaces';

export const ExtractUserU = (token: string): TokenPayloadI | null => {
  if (!token) {
    console.error('ExtractUserU - No token provided', !token);
    return null;
  }
  try {
    const decodedToken = jwt.decode(token) as TokenPayloadI;

    const userRole = decodedToken.role;

    if (userRole === ROLEC.client) return decodedToken;

    const verifiedToken = jwt?.verify(token, KEYS.SECRET);

    return verifiedToken as TokenPayloadI;
  } catch (error) {
    console.log('EXTRAC', error);
    throw new UnauthorizedException(RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED);
  }
};
