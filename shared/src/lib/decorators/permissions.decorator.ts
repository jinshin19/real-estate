// NestJs Imports
import { SetMetadata } from "@nestjs/common";
// Constants
import { KEYS } from "../constants/key.contants.js";

export const Permissions = (...permissions: string[]) =>
  SetMetadata(KEYS.PERMISSIONK, permissions);
