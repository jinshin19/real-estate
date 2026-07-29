// NestJs Imports
import {
  Get,
  Body,
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
// Library
import {
  // Cosntants
  ROLEC,
  PERMISSIONSC,
  // Guard
  AuthGuard,
  RolesGuard,
  // Decorators
  Roles,
  Permissions,
  HttpInterceptor,
  PermissionGuard,
  // Types
  type TokenPayloadI,
} from "@servers/library";
// DTO's
import { QueriesDTO, UpdateByIdDTO } from "./dto";
// Modules
import { UsersService } from "./users.service";

// @ApiBearerAuth("")
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.USERS.get)
  // @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: "Get all the users" })
  public async users(
    @Query(JoiPipe) queries: QueriesDTO,
    @Headers("token-payload") tokenPayload: TokenPayloadI,
  ) {
    return this.usersService.users(queries, tokenPayload);
  }

  @Get(":userId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get a user by ID" })
  public async getById(
    @Param("userId") userId: string,
    @Headers("token-payload") tokenPayload: TokenPayloadI,
  ) {
    return this.usersService.getById(userId, tokenPayload);
  }

  @Patch(":userId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.USERS.updateById)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: "Update user by ID" })
  public async updateById(
    @Param("userId") userId: string,
    @Body(JoiPipe) payload: UpdateByIdDTO,
    @Headers("token-payload") tokenPayload: TokenPayloadI,
  ) {
    return this.usersService.updateById(userId, payload, tokenPayload);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.USERS.deleteByIds)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: "Hard deletion of selected ID or multiple ID" })
  public async deleteByIds(@Query("userIds") userIds: string) {
    return this.usersService.deleteByIds(userIds);
  }
}
