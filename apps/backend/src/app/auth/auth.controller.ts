// NestJs Imports
import { JoiPipe } from "nestjs-joi";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
// DTO's
import { RegisterDTO } from "./dto";
// Modules
import { AuthService } from "./auth.service";

// @ApiBearerAuth("")
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @HttpCode(201)
  @ApiOperation({ summary: "Register new user" })
  public async register(@Body(JoiPipe) payload: RegisterDTO) {
    return this.authService.register(payload);
  }
}
