// NestJs Imports
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Shared
import {
  // Schema
  User,
  Agent,
  Client,
  UserSchema,
  AgentSchema,
  ClientSchema,
  // Services
} from '@library/schema';
// Services
import { JWTModule } from '@library/services';
// Modules
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

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
