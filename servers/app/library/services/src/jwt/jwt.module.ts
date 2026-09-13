// NestJs Imports
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// Services
import { JWTService } from './jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>(
          'JINSHIN19_REAL_ESTATE_JWT_SECRET_KEY',
        ),
      }),
    }),
  ],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
