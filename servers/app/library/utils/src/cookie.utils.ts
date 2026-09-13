// NestJs Imports
import { Response } from 'express';

export const SetCookieU = (
  response: Response,
  token: string,
  maxAge?: number,
) => {
  return response.cookie('refresh_token', token, {
    httpOnly: true,
    sameSite: 'strict',
    // maxAge: 1,
    maxAge: 1000 * 60 * (maxAge ?? 1), // Two minutes
  });
};
