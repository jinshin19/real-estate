// NestJs Imports
import { StringValue } from 'ms';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { KEYS } from '@library/constants';

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  private generateToken(data: any, expiresIn: StringValue) {
    try {
      const token = this.jwtService.sign(data, {
        expiresIn,
      });
      return token;
    } catch (error) {
      return error;
    }
  }

  public generateAccessToken(data: any, expiresIn: StringValue = '1m') {
    try {
      const generatedToken = this.generateToken(data, expiresIn);
      return generatedToken;
    } catch (error) {
      return error;
    }
  }

  public generateRefreshToken(data: any, expiresIn: StringValue = '3m') {
    try {
      const generatedToken = this.generateToken(data, expiresIn);
      return generatedToken;
    } catch (error) {
      return error;
    }
  }

  public decodeToken(token: string): TokenResponseI {
    try {
      const validatedToken = this.jwtService.verify(token, {});
      return {
        success: true,
        data: validatedToken,
      };
    } catch (error) {
      console.log('Decoding token', error);
      return {
        success: false,
      };
    }
  }

  public validateToken(token: string): TokenResponseI {
    try {
      const validatedToken = this.jwtService.verify(token);
      return {
        success: true,
        data: validatedToken,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }

  public rotationToken(
    accessToken: string,
    refreshToken: string,
  ): RotationTokenResponseI {
    try {
      if (!accessToken && !refreshToken)
        return {
          accessToken: null,
          isValid: false,
        };

      if (accessToken && !refreshToken) {
        const validatedToken = this.validateToken(accessToken);

        if (!validatedToken.success)
          return { accessToken: null, isValid: false };

        return {
          accessToken,
          isValid: true,
        };
      }

      if (!accessToken && refreshToken) {
        const validatedToken = this.validateToken(refreshToken);
        if (!validatedToken.success) {
          return {
            accessToken: null,
            isValid: false,
          };
        }

        delete validatedToken.data?.iat;
        delete validatedToken.data?.exp;

        const accessToken = this.generateAccessToken(
          validatedToken.data,
          KEYS.ACCESSTOKENEXPK as StringValue,
        ) as string;

        return {
          accessToken,
          isValid: true,
        };
      }

      return {
        accessToken,
        isValid: true,
      };
    } catch (error) {
      console.log('JWTService error:', error);
      return {
        accessToken: null,
        isValid: false,
      };
    }
  }
}

interface TokenResponseI {
  success: boolean;
  message?: string;
  data?: any;
}

interface RotationTokenResponseI {
  accessToken: string | null;
  isValid: boolean;
}
