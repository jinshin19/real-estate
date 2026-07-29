// NestJs Imports
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "@nestjs/common";
// Constants
import { ROLEC } from "../constants/index";
import { KEYS } from "../constants/key.contants";
import { RESPONSE_MESSAGES } from "../constants/response-messages.constants";
// Types
import { type TokenPayloadI } from "../interfaces/token-payload.interfaces";

export const ExtractUserU = (token: string): TokenPayloadI | null => {
  if (!token) {
    console.error("ExtractUserU - No token provided", !token);
    return null;
  }
  try {
    const decodedToken = jwt.decode(token) as TokenPayloadI;

    const userRole = decodedToken.role;

    if (userRole === ROLEC.client) return decodedToken;

    const verifiedToken = jwt?.verify(token, KEYS.SECRET);

    return verifiedToken as TokenPayloadI;
  } catch (error) {
    console.log("EXTRAC", error);
    throw new UnauthorizedException(RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED);
  }
};
