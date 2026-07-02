// NestJs Imports
import { isEmpty } from "lodash";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpStatus, Injectable } from "@nestjs/common";
// Shared
import {
  // Schema
  Transaction,
  // Constants
  RESPONSE_MESSAGES,
  // Interfaces
  type ResponseHandlerI,
  // Handler
  ResponseHandlerService,
} from "@crud1/shared";
// DTO's
import { CreateDTO, UpdateByIdDTO } from "./dto";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transaction: Model<Transaction>,
  ) {}

  private readonly serviceName = "TransactionsService";

  public async transactions(): Promise<ResponseHandlerI> {
    const methodName = this.transactions.name;
    try {
      const transactions = await this.transaction.aggregate([
        {
          $match: {},
        },
      ]);

      if (isEmpty(transactions)) {
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
        data: transactions,
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

  public async getById(transactionId: string): Promise<ResponseHandlerI> {
    const methodName = this.getById.name;
    try {
      const transaction = await this.transaction.aggregate([
        {
          $match: {
            _id: transactionId,
          },
        },
      ]);

      if (isEmpty(transaction)) {
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
        data: transaction,
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
      const createdTransaction = await this.transaction.create({
        reservationId: payload?.reservationId,
        amount: payload?.amount,
        type: payload?.type,
        status: payload?.status,
        paymentMethod: payload?.paymentMethod,
        referenceNumber: payload?.referenceNumber,
        paidAt: payload?.paidAt,
      });

      if (isEmpty(createdTransaction)) {
        return ResponseHandlerService({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
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
    transactionId: string,
    payload: UpdateByIdDTO,
  ): Promise<ResponseHandlerI> {
    const methodName = this.updateById.name;
    try {
      if (payload.action === "remove") {
        const updatedTransaction = await this.transaction.findOneAndUpdate(
          {
            _id: transactionId,
            isDeleted: false,
          },
          {
            isDeleted: true,
          },
        );

        if (isEmpty(updatedTransaction)) {
          return ResponseHandlerService({
            status: HttpStatus.NOT_FOUND,
            success: false,
            message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
          });
        }
      }

      if (payload.action === "update") {
        const updatedTransaction = await this.transaction.findOneAndUpdate(
          {
            _id: transactionId,
            isDeleted: false,
          },
          {
            ...(payload?.reservationId
              ? { reservationId: payload?.reservationId }
              : {}),
            ...(payload?.amount ? { amount: payload?.amount } : {}),
            ...(payload?.type ? { type: payload?.type } : {}),
            ...(payload?.status ? { status: payload?.status } : {}),
            ...(payload?.paymentMethod
              ? { paymentMethod: payload?.paymentMethod }
              : {}),
            ...(payload?.referenceNumber
              ? { referenceNumber: payload?.referenceNumber }
              : {}),
            ...(payload?.paidAt ? { paidAt: payload?.paidAt } : {}),
          },
        );

        if (isEmpty(updatedTransaction)) {
          return ResponseHandlerService({
            status: HttpStatus.NOT_FOUND,
            success: false,
            message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
          });
        }
      }

      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message:
          payload.action === "remove"
            ? RESPONSE_MESSAGES.SUCCESS.DELETED
            : RESPONSE_MESSAGES.SUCCESS.UPDATED,
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

  public async hardDeleteById(
    transactionId: string,
  ): Promise<ResponseHandlerI> {
    const methodName = this.hardDeleteById.name;
    try {
      const deletedTransaction = await this.transaction.deleteOne({
        _id: transactionId,
      });

      if (isEmpty(deletedTransaction.deletedCount === 0)) {
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
