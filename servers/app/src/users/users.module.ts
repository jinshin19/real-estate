// NestJs Imports
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Services
import { JWTModule } from '@library/services';
// Schemas
import { User, UserSchema } from '@library/schema';
// Modules
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

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
