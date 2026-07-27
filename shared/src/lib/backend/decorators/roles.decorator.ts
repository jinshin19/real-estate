// NestJs Imports
import { SetMetadata } from "@nestjs/common";
// Constants
import { KEYS } from "../constants/key.contants.js";

export const Roles = (...roles: string[]) => SetMetadata(KEYS.ROLESK, roles);
