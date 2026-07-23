// NestJs Imports
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// Modules
import { ReservationsService } from "./reservations.service";
import { ReservationsController } from "./reservations.controller";
// Shared
import {
    // Services
    JWTModule,
    // Schema
    Reservation,
    ReservationSchema,
} from "@crud1/shared";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        // Reservation
        name: Reservation.name,
        schema: ReservationSchema,
      },
    ]),
    JWTModule,
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
