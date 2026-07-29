// NestJs Imports
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// Library
import {
  // Schema
  User,
  UserSchema,
  Agent,
  AgentSchema,
  Client,
  ClientSchema,
  // Services
  JWTModule,
} from "@servers/library";
// Modules
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        // User
        name: User.name,
        schema: UserSchema,
      },
      {
        // Agent
        name: Agent.name,
        schema: AgentSchema,
      },
      {
        // Client
        name: Client.name,
        schema: ClientSchema,
      },
    ]),
    // Modules
    JWTModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
