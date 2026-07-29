// NestJs Imports
import { isEmpty } from "lodash";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { HttpStatus, Injectable } from "@nestjs/common";
// Library
import {
  // Schema
  Property,
  // Utils
  PaginationU,
  RemoveRootIdU,
  RolesPrivilegesC,
  // Constants
  AddRemoveRootIdU,
  RESPONSE_MESSAGES,
  // Services
  ResponseHandlerService,
  // Interfaces
  type UserRolesT,
  type TokenPayloadI,
  type PropertyStatusT,
  type ResponseHandlerI,
  type PropertyAdminSuperAdminT,
  type PropertyAgentAdminSuperAdminT,
} from "@servers/library";
// DTO's
import { CreateDTO, QueriesDTO, UpdateByIdDTO } from "./dto";
@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private readonly property: Model<Property>,
  ) {}

  private readonly serviceName = "PropertiesService";

  public async properties(
    queries: QueriesDTO,
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.properties.name;
    try {
      const userRole = tokenPayload?.role ?? "client";

      const payloadStatus = this.GetPropertyStatus(
        userRole as UserRolesT,
        queries.status as PropertyStatusT & "all",
      );

      console.log(payloadStatus);

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

      if (queries.status) {
        if (queries.status === "all") {
          console.log("went here to all");
          aggregateQuery.push({
            $match: {
              $or: payloadStatus.allowedStatuses,
            },
          });
        }

        if (queries.status !== "all") {
          console.log("went here not all", {
            role: userRole,
            status: queries.status,
            payloadStatus,
          });
          aggregateQuery.push({
            $match: {
              status: Object.values(payloadStatus.status)[0],
            },
          });
        }
      }

      console.log("aggregateQuery", aggregateQuery);

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

  public async getById(
    propertyId: string,
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.getById.name;
    try {
      const userRole = tokenPayload?.role ?? "client";

      const status = this.GetPropertyStatusById(userRole as UserRolesT);

      const property = await this.property.findOne({
        _id: propertyId,
        $or: status,
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

  public async create(
    payload: CreateDTO,
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.create.name;
    try {
      const userRole = tokenPayload.role;

      const createdProperty = await this.property.create({
        title: payload.title,
        description: payload.description,
        projectId: payload.projectId,
        houseModelId: payload.houseModelId,
        price: payload.price,
        reservationFee: payload.reservationFee,
        status: userRole === "agent" ? "unavailable" : payload.status,
        isFeatured: userRole === "agent" ? false : payload.isFeatured,
        isPublished: userRole === "agent" ? false : payload.isPublished,
        location: payload.location,
        images: payload.images,
        features: payload.features,
        specifications: payload.specifications,
        createdBy: tokenPayload.id,
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
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.updateById.name;
    try {
      const userRole = tokenPayload.role;

      const updatedProperty = await this.property.findOneAndUpdate(
        {
          _id: propertyId,
        },
        {
          ...(payload?.title &&
          RolesPrivilegesC.properties1.includes(
            userRole as PropertyAgentAdminSuperAdminT,
          )
            ? { title: payload.title }
            : {}),
          ...(payload?.description &&
          RolesPrivilegesC.properties1.includes(
            userRole as PropertyAgentAdminSuperAdminT,
          )
            ? { description: payload.description }
            : {}),
          ...(payload?.projectId &&
          RolesPrivilegesC.properties1.includes(
            userRole as PropertyAgentAdminSuperAdminT,
          )
            ? { projectId: payload.projectId }
            : {}),
          ...(payload?.houseModelId &&
          RolesPrivilegesC.properties1.includes(
            userRole as PropertyAgentAdminSuperAdminT,
          )
            ? { houseModelId: payload.houseModelId }
            : {}),
          ...(payload?.price &&
          RolesPrivilegesC.properties1.includes(
            userRole as PropertyAgentAdminSuperAdminT,
          )
            ? { price: payload.price }
            : {}),
          ...(payload?.reservationFee &&
          RolesPrivilegesC.properties1.includes(
            userRole as PropertyAgentAdminSuperAdminT,
          )
            ? { reservationFee: payload.reservationFee }
            : {}),
          ...(payload?.status
            ? {
                status: this.GetUpdatePropertyStatus(
                  userRole as PropertyAgentAdminSuperAdminT,
                  payload.status,
                ),
              }
            : {}),
          ...(payload?.isFeatured &&
          RolesPrivilegesC.properties2.includes(
            userRole as PropertyAdminSuperAdminT,
          )
            ? { isFeatured: payload.isFeatured }
            : {}),
          ...(payload?.isPublished &&
          RolesPrivilegesC.properties2.includes(
            userRole as PropertyAdminSuperAdminT,
          )
            ? { isPublished: payload.isPublished }
            : {}),
          ...(payload?.location &&
          RolesPrivilegesC.properties1.includes(
            userRole as PropertyAgentAdminSuperAdminT,
          )
            ? { location: payload.location }
            : {}),
          ...(payload?.images &&
          RolesPrivilegesC.properties1.includes(
            userRole as PropertyAgentAdminSuperAdminT,
          )
            ? { images: payload.images }
            : {}),
          ...(payload?.features &&
          RolesPrivilegesC.properties1.includes(
            userRole as PropertyAgentAdminSuperAdminT,
          )
            ? { features: payload.features }
            : {}),
          ...(payload?.specifications &&
          RolesPrivilegesC.properties1.includes(
            userRole as PropertyAgentAdminSuperAdminT,
          )
            ? { specifications: payload.specifications }
            : {}),
          ...(payload?.createdBy &&
          RolesPrivilegesC.properties2.includes(
            userRole as PropertyAdminSuperAdminT,
          )
            ? { createdBy: payload.createdBy }
            : {}),
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

  private GetPropertyStatus(
    role: UserRolesT,
    // status: GetPropertyStatusFilterI,
    status: PropertyStatusT & "all",
  ): GetPropertyStatusFilterResponseI {
    console.log("STAUS FROM ", status);
    if (!status)
      return {
        status: "available",
        allowedStatuses: [],
      };

    const roles: Record<UserRolesT, GetPropertyStatusFilterI[]> = {
      client: [{ status: "available" }],
      agent: [{ status: "available" }, { status: "unavailable" }],
      admin: [
        { status: "all" },
        { status: "available" },
        { status: "unavailable" },
        { status: "sold" },
        { status: "reserved" },
      ],
      superadmin: [
        { status: "all" },
        { status: "available" },
        { status: "unavailable" },
        { status: "sold" },
        { status: "reserved" },
      ],
    };

    const allowedStatusPerRole = roles[role].includes(status);

    console.log("TEST", roles[role][0] as PropertyStatusT & "all");

    return allowedStatusPerRole
      ? {
          status,
          allowedStatuses: roles[role],
        }
      : {
          status: (roles[role][
            roles[role].findIndex((index) => index.status === status)
          ] || roles[role][0]) as PropertyStatusT & "all",
          allowedStatuses: roles[role],
        };
  }

  private GetPropertyStatusById(role: UserRolesT): GetPropertyStatusByIdI[] {
    console.log("role", role);
    const roles: Record<UserRolesT, GetPropertyStatusByIdI[]> = {
      client: [{ status: "available" }],
      agent: [{ status: "available" }, { status: "unavailable" }],
      admin: [
        { status: "available" },
        { status: "unavailable" },
        { status: "sold" },
        { status: "reserved" },
      ],
      superadmin: [
        { status: "available" },
        { status: "unavailable" },
        { status: "sold" },
        { status: "reserved" },
      ],
    };

    const allowedStatusPerRole = roles[role];

    return allowedStatusPerRole;
  }

  private GetUpdatePropertyStatus(
    role: PropertyAgentAdminSuperAdminT,
    status: PropertyStatusT,
  ): PropertyStatusT {
    if (!status) return "unavailable";

    if (role === "agent") return "unavailable";

    return status;
  }
}
interface GetPropertyStatusByIdI {
  // status: string;
  status: PropertyStatusT;
}
// type GetPropertyStatusFilterT = PropertyStatusT | "all";
interface GetPropertyStatusFilterI {
  status: PropertyStatusT | "all";
}

interface GetPropertyStatusFilterResponseI {
  status: PropertyStatusT | "all";
  allowedStatuses: GetPropertyStatusFilterI[];
}
