// NestJs Imports
import { Model } from "mongoose";
import { isEmpty } from "lodash";
import { type Response } from "express";
import { InjectModel } from "@nestjs/mongoose";
import { HttpStatus, Injectable } from "@nestjs/common";
// Shared
import {
  // Schema
  User,
  Agent,
  Client,
  // Services
  JWTService,
  // Utils
  SetCookieU,
  AddRemoveRootIdU,
  // Constants
  RESPONSE_MESSAGES,
  // Interfaces
  type ResponseHandlerI,
  // Handler
  ResponseHandlerService,
  SetRolePermissionsU,
  SetRolePermissionsT,
} from "@crud1/shared";
// DTO's
import { LoginDTO, RegisterDTO } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>,
    @InjectModel(Agent.name)
    private readonly agent: Model<Agent>,
    @InjectModel(Client.name)
    private readonly client: Model<Client>,
    private readonly jwtService: JWTService,
  ) {}

  private readonly serviceName = "AuthService";

  public async login(
    response: Response,
    payload: LoginDTO,
  ): Promise<ResponseHandlerI> {
    const methodName = this.login.name;
    try {
      const user = await this.user.findOne({
        isDeleted: false,
        email: payload.email,
      });

      if (isEmpty(user)) {
        return ResponseHandlerService({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
        });
      }

      const isPasswordSame = payload.password === user.password;

      if (!isPasswordSame) {
        return ResponseHandlerService({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
        });
      }

      const data = AddRemoveRootIdU(user.toJSON());

      delete data?.isDeleted;
      delete data?.password;

      const getRolePermissions = SetRolePermissionsU(
        user.role as SetRolePermissionsT,
      );

      const accessToken = this.jwtService.generateAccessToken({
        ...data,
        permissions: getRolePermissions || [],
      });
      const refreshToken = this.jwtService.generateRefreshToken({
        id: data.id,
      });

      SetCookieU(response, refreshToken as string);

      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.OK,
        data: {
          token: accessToken,
          user: data,
        },
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

  public async register(payload: RegisterDTO): Promise<ResponseHandlerI> {
    const methodName = this.register.name;
    try {
      const user = await this.user.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        middleName: payload.middleName,
        contactNumber: payload.contactNumber,
        birthDate: payload.birthDate,
        gender: payload.gender,
        email: payload.email,
        role: payload.role,
        photo: payload.photo,
        password: payload.password,
      });

      if (payload.role === "agent") {
        await this.agent.create({
          userId: user?._id,
          managerId: "",
          branchId: "",
          hireDate: new Date().toISOString(),
        });
      }

      if (payload.role === "client") {
        await this.client.create({
          userId: user?._id,
          agentId: "",
          govermentId: "",
        });
      }

      return ResponseHandlerService({
        status: HttpStatus.CREATED,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.REGISTERED,
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

  public async refresh(
    response: Response,
    refreshToken: string,
  ): Promise<ResponseHandlerI> {
    const methodName = this.refresh.name;
    try {
      const validatedToken = this.jwtService.validateToken(refreshToken);

      if (!validatedToken.success) {
        return ResponseHandlerService({
          status: HttpStatus.UNAUTHORIZED,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
        });
      }

      const user = await this.user.findOne(
        {
          _id: validatedToken.data?.id,
          isDeleted: false,
        },
        {
          _id: 1,
        },
      );

      if (isEmpty(user)) {
        return ResponseHandlerService({
          status: HttpStatus.UNAUTHORIZED,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.PERMISSION_DENIED,
        });
      }

      SetCookieU(response, refreshToken as string);

      const generatedAccessToken = this.jwtService.generateAccessToken({
        id: user._id,
      });

      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.OK,
        data: {
          token: generatedAccessToken,
        },
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
