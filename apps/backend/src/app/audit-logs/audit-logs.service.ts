// NestJs Imports
import { isEmpty } from "lodash";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpStatus, Injectable } from "@nestjs/common";
// Shared
import {
  // Schema
  AuditLogs,
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
export class AuditLogsService {
  constructor(
    @InjectModel(AuditLogs.name)
    private readonly auditLog: Model<AuditLogs>,
  ) {}

  private readonly serviceName = "auditLogsService";

  public async auditLogs(): Promise<ResponseHandlerI> {
    const methodName = this.auditLogs.name;
    try {
      const auditLogs = await this.auditLog.aggregate([
        {
          $match: {},
        },
      ]);

      if (isEmpty(auditLogs)) {
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
        data: auditLogs,
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

  public async getById(auditLogId: string): Promise<ResponseHandlerI> {
    const methodName = this.getById.name;
    try {
      const auditLog = await this.auditLog.aggregate([
        {
          $match: {
            _id: auditLogId,
          },
        },
      ]);

      if (isEmpty(auditLog)) {
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
        data: auditLog,
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
      const createdAuditLog = await this.auditLog.create({
        userId: payload?.userId,
        collectionId: payload?.collectionId,
        collectionName: payload?.collectionName,
        action: payload?.action,
        field: payload?.field,
        oldValue: payload?.oldValue,
        newValue: payload?.newValue,
        userAgent: payload?.userAgent,
      });

      if (isEmpty(createdAuditLog)) {
        return ResponseHandlerService({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
        });
      }

      return ResponseHandlerService({
        status: HttpStatus.CREATED,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.CREATED,
        data: createdAuditLog,
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

  public async deleteById(auditLogId: string): Promise<ResponseHandlerI> {
    const methodName = this.deleteById.name;
    try {
      const deletedAuditLog = await this.auditLog.deleteOne({
        _id: auditLogId,
      });

      if (isEmpty(deletedAuditLog.deletedCount === 0)) {
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
