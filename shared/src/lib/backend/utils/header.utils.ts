// NestJs Imports
import { Request } from "express";

export const ExtractAccessTokenU = (request: Request): string | null => {
  const headers = request.headers;
  const authorization = headers["authorization"] ?? null;

  if (!authorization) return null;

  const token = authorization.replace("Bearer ", "");
  return token;
};

export const ExtractRefreshTokenU = (request: Request): string | null => {
  const cookies = request.cookies;
  const token = cookies["refresh_token"] ?? null;

  if (!token) return null;

  return token;
};
