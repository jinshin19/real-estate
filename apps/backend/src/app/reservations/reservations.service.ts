// NestJs Imports
import { isEmpty } from "lodash";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpStatus, Injectable } from "@nestjs/common";
// Shared
import {
  // Schema
  Reservation,
  // Constants
  RESPONSE_MESSAGES,
  // Interfaces
  type ResponseHandlerI,
  // Handler
  ResponseHandlerService,
} from "@crud1/shared";
// DTO's
import { CreateDTO } from "./dto";

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservation: Model<Reservation>,
  ) {}

  private readonly serviceName = "ReservationsService";

  public async reservations(): Promise<ResponseHandlerI> {
    const methodName = this.reservations.name;
    try {
      const reservations = await this.reservation.aggregate([
        {
          $match: {},
        },
      ]);

      if (isEmpty(reservations)) {
        return ResponseHandlerService({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
        });
      }

      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.RETRIEVED,
        data: reservations,
      });
    } catch (error: unknown) {
      return ResponseHandlerService({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        errorDetails: {
          name: `${this.serviceName}.${methodName}`,
          error,
        },
      });
    }
  }

  public async getById(reservationId: string): Promise<ResponseHandlerI> {
    const methodName = this.getById.name;
    try {
      const reservation = await this.reservation.aggregate([
        {
          $match: {
            _id: reservationId,
          },
        },
      ]);

      if (isEmpty(reservation)) {
        return ResponseHandlerService({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
        });
      }

      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.RETRIEVED,
        data: reservation,
      });
    } catch (error: unknown) {
      return ResponseHandlerService({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        errorDetails: {
          name: `${this.serviceName}.${methodName}`,
          error,
        },
      });
    }
  }

  public async create(payload: CreateDTO): Promise<ResponseHandlerI> {
    const methodName = this.create.name;
    try {
      const createdReservation = await this.reservation.create({
        propertyId: payload?.propertyId,
        agentId: payload?.agentId,
        customerId: payload?.customerId,
        status: payload.status,
        reservationFee: payload.reservationFee,
        reservationDate: payload.reservationDate,
        expiresAt: payload.expiresAt,
        remarks: payload?.remarks,
      });

      if (isEmpty(createdReservation)) {
        return ResponseHandlerService({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        });
      }

      return ResponseHandlerService({
        status: HttpStatus.CREATED,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.CREATED,
      });
    } catch (error: unknown) {
      return ResponseHandlerService({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        errorDetails: {
          name: `${this.serviceName}.${methodName}`,
          error,
        },
      });
    }
  }

  public async deleteById(reservationId: string): Promise<ResponseHandlerI> {
    const methodName = this.deleteById.name;
    try {
      const deletedReservation = await this.reservation.deleteOne({
        _id: reservationId,
      });

      if (isEmpty(deletedReservation.deletedCount === 0)) {
        return ResponseHandlerService({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
        });
      }

      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.DELETED,
      });
    } catch (error: unknown) {
      return ResponseHandlerService({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        errorDetails: {
          name: `${this.serviceName}.${methodName}`,
          error,
        },
      });
    }
  }
}
