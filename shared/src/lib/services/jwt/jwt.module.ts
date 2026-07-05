import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JWTService } from "./jwt.service.js";

@Module({
  imports: [
    JwtModule.register({
      secret: "123",
    }),
  ],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
