// NestJs Imports
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// Modules
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
// Library
import {
  // Services
  JWTModule,
  // Schema
  User,
  UserSchema,
} from "@servers/library";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        // User
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JWTModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
