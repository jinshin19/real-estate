import { decode } from "jsonwebtoken";
import { TokenPayloadI } from "../interfaces/token-payload.interfaces.js";

export const ExtractUserU = (token: string): TokenPayloadI | null => {
  if (!token) {
    console.error("ExtractUserU - No token provided", !token);
    return null;
  }
  const decordedToken = decode(token);
  return decordedToken as TokenPayloadI;
};
