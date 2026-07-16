// NestJs Imports
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
// Services
import { JWTService } from "./jwt.service.js";
// Constants
import { KEYS } from "../../constants/key.contants.js";

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
