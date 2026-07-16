// NestJs Imports
import {
  Get,
  Body,
  Post,
  Param,
  Query,
  Patch,
  Delete,
  Headers,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  UseInterceptors,
} from "@nestjs/common";
import { JoiPipe } from "nestjs-joi";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
// Shared
import {
  // Contants
  ROLEC,
  PERMISSIONSC,
  // Guards
  AuthGuard,
  RolesGuard,
  PermissionGuard,
  // Decorators
  Roles,
  Permissions,
  HttpInterceptor,
  // Types
  type TokenPayloadI,
} from "@crud1/shared";
// Modules
import { PropertiesService } from "./properties.service";
// DTO's
import { CreateDTO, QueriesDTO, UpdateByIdDTO } from "./dto";

// @ApiBearerAuth("")
@ApiTags("Properties")
@Controller("properties")
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get all the properties" })
  public async properties(
    @Query(JoiPipe) queries: QueriesDTO,
    @Headers("token-payload") tokenPayload: TokenPayloadI,
  ) {
    return this.propertiesService.properties(queries, tokenPayload);
  }

  @Get(":propertyId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get a property by ID" })
  public async getById(
    @Param("propertyId") propertyId: string,
    @Headers("token-payload") tokenPayload: TokenPayloadI,
  ) {
    return this.propertiesService.getById(propertyId, tokenPayload);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(ROLEC.agent, ROLEC.admin)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.PROPERTIES.create)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @ApiOperation({ summary: "Create a property" })
  public async create(
    @Body(JoiPipe) payload: CreateDTO,
    @Headers("token-payload") tokenPayload: TokenPayloadI,
  ) {
    return this.propertiesService.create(payload, tokenPayload);
  }

  @Patch(":propertyId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.PROPERTIES.updateById)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @ApiOperation({ summary: "Update property by ID" })
  public async updateById(
    @Param("propertyId") propertyId: string,
    @Body(JoiPipe) payload: UpdateByIdDTO,
    @Headers("token-payload") tokenPayload: TokenPayloadI,
  ) {
    return this.propertiesService.updateById(propertyId, payload, tokenPayload);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Roles(ROLEC.admin, ROLEC.superadmin)
  @Permissions(PERMISSIONSC.PROPERTIES.deleteByIds)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @ApiOperation({ summary: "Hard deletion of selected ID or multiple ID" })
  public async deleteByIds(@Query("propertyIds") propertyIds: string) {
    return this.propertiesService.deleteByIds(propertyIds);
  }
}
