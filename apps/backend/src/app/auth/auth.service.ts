// NestJs Imports
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpStatus, Injectable } from "@nestjs/common";
// Shared
import {
  // Schema
  User,
  // Constants
  RESPONSE_MESSAGES,
  // Interfaces
  type ResponseHandlerI,
  // Handler
  ResponseHandlerService,
  Agent,
  Client,
} from "@crud1/shared";
// DTO's
import { RegisterDTO } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>,
    @InjectModel(Agent.name)
    private readonly agent: Model<Agent>,
    @InjectModel(Client.name)
    private readonly client: Model<Client>,
  ) {}

  private readonly serviceName = "AuthService";

  public async login(payload: any): Promise<ResponseHandlerI> {
    const methodName = this.login.name;
    try {
      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.OK,
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
}
