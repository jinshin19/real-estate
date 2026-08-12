// NestJs Imports
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  public generateAccessToken(data: any) {
    try {
      const generatedToken = this.generateToken(data, "1m");
      return generatedToken;
    } catch (error) {
      return error;
    }
  }

  public generateRefreshToken(data: any) {
    try {
      const generatedToken = this.generateToken(data, "3m");
      return generatedToken;
    } catch (error) {
      return error;
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

  public decodeToken(token: string): TokenResponseI {
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

  private generateToken(data: any, expiresIn: string) {
    try {
      const token = this.jwtService.sign(data, {
        expiresIn: "2m",
      });
      return token;
    } catch (error) {
      return error;
    }
  }
}

interface TokenResponseI {
  success: boolean;
  message?: string;
  data?: any;
}
