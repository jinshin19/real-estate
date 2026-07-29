// NestJs Imports
import { JoiPipe } from "nestjs-joi";
import { type Response } from "express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import {
  Res,
  Get,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  Controller,
  UseInterceptors,
} from "@nestjs/common";
// DTO's
import { LoginDTO, RegisterDTO } from "./dto";
// Modules
import { AuthService } from "./auth.service";
// Library
import {
  // Decorator
  HttpInterceptor,
} from "@servers/library";

// @ApiBearerAuth("")
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("refresh")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Refresh token" })
  public async refresh(
    @Headers("refresh-token") refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refresh(response, refreshToken);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Login user" })
  public async login(
    @Body(JoiPipe) payload: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(response, payload);
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Register new user" })
  public async register(@Body(JoiPipe) payload: RegisterDTO) {
    return this.authService.register(payload);
  }
}
