// NestJs Imports
import * as mongoose from 'mongoose';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
// Decorators
import { HttpExceptionFilter } from '@library/decorators';
// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UploadsModule } from './uploads/uploads.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `apps/backend/src/environment/.env.${process.env.NODE_ENV}`,
      envFilePath: `environment/.env.local`,
    }),
    MongooseModule.forRoot(process.env.JINSHIN19_REAL_ESTATE_CONNECTION!),
    // Modules
    AuthModule,
    UsersModule,
    // AuditLogsModule,
    PropertiesModule,
    // TransactionsModule,
    ReservationsModule,
    UploadsModule,
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
    this.connection.on('connected', () =>
      console.log(`Database is connected in ${process.env.NODE_ENV} module`),
    );
    this.connection.on('disconnected', () =>
      console.log(`Database is disconnected in ${process.env.NODE_ENV} module`),
    );
    this.connection.on('error', () =>
      console.log(`Database has error in ${process.env.NODE_ENV} module`),
    );
  }
}
