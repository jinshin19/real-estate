// NestJs Imports
import { isEmpty } from "lodash";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpStatus, Injectable } from "@nestjs/common";
// Shared
import {
  RESPONSE_MESSAGES,
  // Interfaces
  type ResponseHandlerI,
  // Handler
  ResponseHandlerService,
  // Schema
  User,
} from "@crud1/shared";
// DTO's
import { UpdateByIdDTO } from "./dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>,
  ) {}

  private readonly serviceName = "UsersService";

  public async users(): Promise<ResponseHandlerI> {
    const methodName = this.users.name;
    try {
      const users = await this.user.aggregate([
        {
          $match: {},
          $project: {
            name: 1,
            email: 1,
            role: 1,
            status: 1,
            dateHired: 1,
          },
        },
      ]);

      if (isEmpty(users)) {
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
        data: users,
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

  public async getById(userId: string): Promise<ResponseHandlerI> {
    const methodName = this.getById.name;
    try {
      const user = await this.user.aggregate([
        {
          $match: {
            _id: userId,
          },
          $project: {
            name: 1,
            email: 1,
            role: 1,
            status: 1,
            dateHired: 1,
          },
        },
      ]);

      if (isEmpty(user)) {
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
        data: user,
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
    userId: string,
    payload: UpdateByIdDTO,
  ): Promise<ResponseHandlerI> {
    const methodName = this.updateById.name;
    try {
      if (payload.action === "remove") {
        const updatedUser = await this.user.findOneAndUpdate(
          {
            _id: userId,
            isDeleted: false,
          },
          {
            isDeleted: true,
          },
        );

        if (isEmpty(updatedUser)) {
          return ResponseHandlerService({
            status: HttpStatus.NOT_FOUND,
            success: false,
            message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
          });
        }
      }

      if (payload.action === "update") {
        const updatedUser = await this.user.findOneAndUpdate(
          {
            _id: userId,
            isDeleted: false,
          },
          {
            ...(payload?.firstName ? { firstName: payload.firstName } : {}),
            ...(payload?.lastName ? { lastName: payload.lastName } : {}),
            ...(payload?.middleName ? { middleName: payload.middleName } : {}),
            ...(payload?.contactNumber
              ? { contactNumber: payload.contactNumber }
              : {}),
            ...(payload?.birthDate ? { birthDate: payload.birthDate } : {}),
            ...(payload?.gender ? { gender: payload.gender } : {}),
            ...(payload?.email ? { email: payload.email } : {}),
            ...(payload?.role ? { role: payload.role } : {}),
            ...(payload?.photo ? { photo: payload.photo } : {}),
            ...(payload?.password ? { password: payload.password } : {}),
          },
        );

        if (isEmpty(updatedUser)) {
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

  public async hardDeleteById(userId: string): Promise<ResponseHandlerI> {
    const methodName = this.hardDeleteById.name;
    try {
      const deletedUser = await this.user.deleteOne({ _id: userId });

      if (isEmpty(deletedUser.deletedCount === 0)) {
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
