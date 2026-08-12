// NestJs Imports
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// Constants
import { KEYS } from '../../../constants';
// Services
import { JWTService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: KEYS.SECRET,
    }),
  ],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
