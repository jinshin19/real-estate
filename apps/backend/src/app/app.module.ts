// NestJs Imports
import * as mongoose from "mongoose";
import { APP_FILTER } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
// Shared
import {
  // Decorators
  HttpExceptionFilter,
} from "@crud1/shared";
// Modules
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `apps/backend/src/environment/.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.CRUD1_DATABASE_CONNECTION_1!),
    // Modules
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(getConnectionToken())
    private connection: mongoose.Connection,
  ) {}

  public onModuleInit() {
    this.connection.on("connected", () =>
      console.log(`Database is connected in ${process.env.NODE_ENV} module`),
    );
    this.connection.on("disconnected", () =>
      console.log(`Database is disconnected in ${process.env.NODE_ENV} module`),
    );
    this.connection.on("error", () =>
      console.log(`Database has error in ${process.env.NODE_ENV} module`),
    );
  }
}
