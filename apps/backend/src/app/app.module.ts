// NestJs Imports
import * as mongoose from "mongoose";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { Inject, Module, OnModuleInit } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
// Shared
import {
  // Guards
  PermissionGuard,
  // Decorators
  HttpExceptionFilter,
} from "@crud1/shared";
// Modules
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PropertiesModule } from "./properties/properties.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { AuditLogsModule } from "./audit-logs/audit-logs.module";
import { ReservationsModule } from "./reservations/reservations.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `apps/backend/src/environment/.env.${process.env.NODE_ENV}`,
      envFilePath: `apps/backend/src/environment/.env.local`,
    }),
    MongooseModule.forRoot(process.env.CRUD1_DATABASE_CONNECTION_1!),
    // Modules
    AuthModule,
    UsersModule,
    // AuditLogsModule,
    PropertiesModule,
    // TransactionsModule,
    // ReservationsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionGuard,
    // },
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
