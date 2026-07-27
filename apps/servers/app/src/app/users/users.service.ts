// NestJs Imports
import { isEmpty } from "lodash";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpStatus, Injectable } from "@nestjs/common";
// Shared
import {
  // Schema
  User,
  // Utils
  PaginationU,
  RemoveRootIdU,
  // Constants
  RESPONSE_MESSAGES,
  // Interfaces
  type TokenPayloadI,
  type ResponseHandlerI,
  // Handler
  ResponseHandlerService,
} from "@crud1/shared";
// DTO's
import { QueriesDTO, UpdateByIdDTO } from "./dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>,
  ) {}

  private readonly serviceName = "UsersService";

  public async users(
    queries: QueriesDTO,
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.users.name;
    try {
      let aggregateQuery = [];

      // const userRole = tokenPayload.role ?? "client";

      if (queries.search) {
        const { search } = queries;
        aggregateQuery.push({
          $match: {
            $or: [
              {
                firstName: {
                  $regex: search,
                  $options: "i",
                },
              },
              {
                lastName: {
                  $regex: search,
                  $options: "i",
                },
              },
            ],
          },
        });
      }

      aggregateQuery.push({
        $match: {
          ...(queries.role ? { role: queries.role } : {}),
        },
      });

      aggregateQuery.push({
        $project: {
          password: 0,
        },
      });

      aggregateQuery.push(...RemoveRootIdU());

      aggregateQuery.push(...PaginationU(queries.page, queries.limit));

      const users = await this.user.aggregate(aggregateQuery);

      if (isEmpty(users[0]?.items)) {
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

  public async getById(
    userId: string,
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.getById.name;
    try {
      // const userRole = tokenPayload.role ?? "client";

      const user = await this.user.findOne({
        _id: userId,
        role: "agent",
        isDeleted: false,
      });

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
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.updateById.name;
    try {
      // const userRole = tokenPayload.role ?? "client";

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

  public async deleteByIds(userIds: string): Promise<ResponseHandlerI> {
    const methodName = this.deleteByIds.name;
    try {
      const selectedIds = userIds?.split(",");

      this.user
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
