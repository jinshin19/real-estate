// NestJs Imports
import {
  Get,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  UseInterceptors,
} from "@nestjs/common";
import { JoiPipe } from "nestjs-joi";
import { UsersService } from "./users.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
// Shared
import {
  // Decorators
  HttpInterceptor,
} from "@crud1/shared";
// DTO's
import { UpdateByIdDTO } from "./dto";

// @ApiBearerAuth("")
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get all the users" })
  public async users() {
    return this.usersService.users();
  }

  @Get(":userId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get a user by ID" })
  public async getById(@Param("userId") userId: string) {
    return this.usersService.getById(userId);
  }

  @Patch(":userId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Update user by ID" })
  public async updateById(
    @Param("userId") userId: string,
    @Body(JoiPipe) payload: UpdateByIdDTO,
  ) {
    return this.usersService.updateById(userId, payload);
  }

  @Delete(":userId")
  @HttpCode(200)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Delete user by ID" })
  public async hardDeleteById(@Param("userId") userId: string) {
    return this.usersService.hardDeleteById(userId);
  }
}
