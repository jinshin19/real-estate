// NestJs Imports
import { isEmpty } from "lodash";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpStatus, Injectable } from "@nestjs/common";
// Shared
import {
  // Schema
  Property,
  // Utils
  PaginationU,
  RemoveRootIdU,
  AddRemoveRootIdU,
  // Constants
  RESPONSE_MESSAGES,
  // Interfaces
  type ResponseHandlerI,
  // Handler
  ResponseHandlerService,
} from "@crud1/shared";
// DTO's
import { CreateDTO, QueriesDTO, UpdateByIdDTO } from "./dto";
@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private readonly property: Model<Property>,
  ) {}

  private readonly serviceName = "PropertiesService";

  public async properties(queries: QueriesDTO): Promise<ResponseHandlerI> {
    const methodName = this.properties.name;
    try {
      let aggregateQuery = [];

      if (queries.search) {
        aggregateQuery.push({
          $search: {
            index: "FULL_TEXT_SEARCH_PROPERTY",
            compound: {
              should: [
                {
                  autocomplete: {
                    query: queries.search,
                    path: "title",
                  },
                },
                {
                  autocomplete: {
                    query: queries.search,
                    path: "description",
                  },
                },
                {
                  autocomplete: {
                    query: queries.search,
                    path: "projectId",
                  },
                },
                {
                  autocomplete: {
                    query: queries.search,
                    path: "houseModelId",
                  },
                },
                {
                  autocomplete: {
                    query: queries.search,
                    path: "features",
                  },
                },
                // Location
                {
                  autocomplete: {
                    query: queries.search,
                    path: "location.country",
                  },
                },
                {
                  autocomplete: {
                    query: queries.search,
                    path: "location.province",
                  },
                },
                {
                  autocomplete: {
                    query: queries.search,
                    path: "location.city",
                  },
                },
                {
                  autocomplete: {
                    query: queries.search,
                    path: "location.barangay",
                  },
                },
                {
                  autocomplete: {
                    query: queries.search,
                    path: "location.street",
                  },
                },
                {
                  autocomplete: {
                    query: queries.search,
                    path: "location.zipCode",
                  },
                },
                // Specifications
                {
                  autocomplete: {
                    query: queries.search,
                    path: "specifications.lotArea",
                  },
                },
                {
                  autocomplete: {
                    query: queries.search,
                    path: "specifications.floodArea",
                  },
                },
              ],
            },
          },
        });
      }

      aggregateQuery.push({
        $match: {
          ...(queries.status !== "all" ? { status: queries.status } : {}),
        },
      });

      aggregateQuery.push(...RemoveRootIdU());

      aggregateQuery.push(...PaginationU(queries.page, queries.limit));

      const properties = await this.property.aggregate(aggregateQuery);

      if (properties.length === 0 || isEmpty(properties)) {
        return ResponseHandlerService({
          status: HttpStatus.NOT_FOUND,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND,
        });
      }

      const data = properties[0];

      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.RETRIEVED,
        data,
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
      const property = await this.property.findOne({
        _id: propertyId,
      });

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
        data: AddRemoveRootIdU(property.toJSON()),
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
        data: AddRemoveRootIdU(createdProperty.toJSON()),
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

  public async deleteByIds(propertyIds: string): Promise<ResponseHandlerI> {
    const methodName = this.deleteByIds.name;
    try {
      const ids = propertyIds.split(",");

      this.property
        .deleteMany({
          _id: {
            $in: ids,
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
