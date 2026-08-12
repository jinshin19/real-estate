// NestJs Imports
import { SetMetadata } from '@nestjs/common';
// Constants
import { KEYS } from '../../constants/src/key.contants';

export const Roles = (...roles: string[]) => SetMetadata(KEYS.ROLESK, roles);
