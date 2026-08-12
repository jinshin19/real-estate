// NestJs Imports
import { isEmpty } from 'lodash';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
// Constants
import { RESPONSE_MESSAGES } from '@library/constants';
// Interfaces
import { type TokenPayloadI } from '@library/interfaces';
// Utils
import { PaginationU, RemoveRootIdU } from '@library/utils';
// DTO's
import { CreateDTO, QueriesDTO, UpdateByIdDTO } from './dto';
// Schemas
import { RLUsersCN, RLPropertiesCN, Reservation } from '@library/schema';
// Handlers
import { ResponseHandlerService, ResponseHandlerI } from '@library/handlers';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservation: Model<Reservation>,
  ) {}

  private readonly serviceName = 'ReservationsService';

  public async reservations(
    queries: QueriesDTO,
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.reservations.name;
    try {
      let aggregateQuery: any[] = [];

      aggregateQuery.push({
        $match: {
          ...(queries.status !== 'all' ? { status: queries.status } : {}),
        },
      });

      aggregateQuery.push({
        $lookup: {
          from: RLUsersCN,
          localField: 'agentId',
          foreignField: '_id',
          as: 'agent',
          pipeline: [
            ...RemoveRootIdU(),
            {
              $project: {
                password: 0,
              },
            },
          ],
        },
      });

      aggregateQuery.push({
        $unwind: '$agent',
      });

      aggregateQuery.push({
        $lookup: {
          from: RLPropertiesCN,
          localField: 'propertyId',
          foreignField: '_id',
          as: 'property',
          pipeline: [...RemoveRootIdU()],
        },
      });

      aggregateQuery.push({
        $unwind: '$property',
      });

      aggregateQuery.push(...RemoveRootIdU());

      aggregateQuery.push(...PaginationU(queries.page, queries.limit));

      const reservations = await this.reservation.aggregate(aggregateQuery);

      if (isEmpty(reservations[0]?.items)) {
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

  public async getById(
    reservationId: string,
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.getById.name;
    try {
      // const userRole = tokenPayload.role ?? "client";

      const [reservation] = await this.reservation.aggregate([
        { $match: { _id: reservationId } },
        {
          $lookup: {
            from: RLUsersCN,
            localField: 'agentId',
            foreignField: '_id',
            as: 'agent',
            pipeline: [
              ...RemoveRootIdU(),
              {
                $project: {
                  password: 0,
                },
              },
            ],
          },
        },
        {
          $unwind: '$agent',
        },
        {
          $lookup: {
            from: RLPropertiesCN,
            localField: 'propertyId',
            foreignField: '_id',
            as: 'property',
            pipeline: [...RemoveRootIdU()],
          },
        },
        {
          $unwind: '$property',
        },
        ...RemoveRootIdU(),
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

  public async create(
    payload: CreateDTO,
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.create.name;
    try {
      // const userRole = tokenPayload.role ?? "client"

      const createdReservation = await this.reservation.create({
        propertyId: payload.propertyId,
        agentId: payload.agentId,
        status: payload.status,
        reservationFee: payload.reservationFee,
        reservedAt: payload.reservedAt,
        expiresAt: payload.expiresAt,
        remarks: payload.remarks,
        createdBy: tokenPayload.id,
      });

      if (isEmpty(createdReservation)) {
        return ResponseHandlerService({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED,
        });
      }

      return ResponseHandlerService({
        status: HttpStatus.OK,
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

  public async updateById(
    reservationId: string,
    payload: UpdateByIdDTO,
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.updateById.name;
    try {
      // const userRole = tokenPayload.role ?? "client"

      const updatedReservation = await this.reservation.findOneAndUpdate(
        {
          _id: reservationId,
        },
        {
          ...(payload.agentId ? { agentId: payload.agentId } : {}),
          ...(payload.status ? { status: payload.status } : {}),
          ...(payload.remarks ? { remarks: payload.remarks } : {}),
        },
      );

      if (isEmpty(updatedReservation)) {
        return ResponseHandlerService({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
        });
      }

      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.UPDATED,
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

  public async deleteByIds(reservationIds: string): Promise<ResponseHandlerI> {
    const methodName = this.deleteByIds.name;
    try {
      const selectedIds = reservationIds?.split(',');

      this.reservation
        .deleteMany({
          _id: {
            $in: selectedIds,
          },
        })
        .then();

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
