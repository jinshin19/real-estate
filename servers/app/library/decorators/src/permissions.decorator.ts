// NestJs Imports
import { SetMetadata } from '@nestjs/common';
// Constants
import { KEYS } from '../../constants/src/key.contants';

export const Permissions = (...permissions: string[]) =>
  SetMetadata(KEYS.PERMISSIONK, permissions);
