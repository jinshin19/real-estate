// NestJs Imports
import { isEmpty } from "lodash";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpStatus, Injectable } from "@nestjs/common";
// Shared
import {
  // Schema
  Property,
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
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private readonly property: Model<Property>,
  ) {}

  private readonly serviceName = "PropertiesService";

  public async properties(): Promise<ResponseHandlerI> {
    const methodName = this.properties.name;
    try {
      const properties = await this.property.aggregate([
        {
          $match: {},
        },
      ]);

      if (isEmpty(properties)) {
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
        data: properties,
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

  public async getById(propertyId: string): Promise<ResponseHandlerI> {
    const methodName = this.getById.name;
    try {
      const property = await this.property.aggregate([
        {
          $match: {
            _id: propertyId,
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

      if (isEmpty(property)) {
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
        data: property,
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
      const createdProperty = await this.property.create({
        title: payload.title,
        description: payload.description,
        projectId: payload.projectId,
        houseModelId: payload.houseModelId,
        price: payload.price,
        reservationFee: payload.reservationFee,
        status: payload.status,
        isFeatured: payload.isFeatured,
        isPublished: payload.isPublished,
        location: payload.location,
        images: payload.images,
        features: payload.features,
        specifications: payload.specifications,
        createdBy: payload.createdBy,
      });

      if (isEmpty(createdProperty)) {
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
        data: createdProperty,
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
    propertyId: string,
    payload: UpdateByIdDTO,
  ): Promise<ResponseHandlerI> {
    const methodName = this.updateById.name;
    try {
      const updatedProperty = await this.property.findOneAndUpdate(
        {
          _id: propertyId,
        },
        {
          ...(payload?.title ? { title: payload.title } : {}),
          ...(payload?.description ? { description: payload.description } : {}),
          ...(payload?.projectId ? { projectId: payload.projectId } : {}),
          ...(payload?.houseModelId
            ? { houseModelId: payload.houseModelId }
            : {}),
          ...(payload?.price ? { price: payload.price } : {}),
          ...(payload?.reservationFee
            ? { reservationFee: payload.reservationFee }
            : {}),
          ...(payload?.status ? { status: payload.status } : {}),
          ...(payload?.isFeatured ? { isFeatured: payload.isFeatured } : {}),
          ...(payload?.isPublished ? { isPublished: payload.isPublished } : {}),
          ...(payload?.location ? { location: payload.location } : {}),
          ...(payload?.images ? { images: payload.images } : {}),
          ...(payload?.features ? { features: payload.features } : {}),
          ...(payload?.specifications
            ? { specifications: payload.specifications }
            : {}),
          ...(payload?.createdBy ? { createdBy: payload.createdBy } : {}),
        },
      );

      if (isEmpty(updatedProperty)) {
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

  public async deleteById(propertyId: string): Promise<ResponseHandlerI> {
    const methodName = this.deleteById.name;
    try {
      const deletedProperty = await this.property.deleteOne({
        _id: propertyId,
      });

      if (isEmpty(deletedProperty.deletedCount === 0)) {
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
