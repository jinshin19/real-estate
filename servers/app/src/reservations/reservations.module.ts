// NestJs Imports
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Services
import { JWTModule } from '@library/services';
// Schema
import { Reservation, ReservationSchema } from '@library/schema';
// Modules
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

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
