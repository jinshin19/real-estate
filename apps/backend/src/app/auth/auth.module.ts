// NestJs Imports
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// Shared
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
} from "@crud1/shared";
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
