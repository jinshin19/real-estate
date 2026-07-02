// NestJs Imports
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
import { RegisterDTO } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly user: Model<User>,
  ) {}

  private readonly serviceName = "AuthService";

  public async register(payload: RegisterDTO): Promise<ResponseHandlerI> {
    const methodName = this.register.name;
    try {
      await this.user.create({
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
