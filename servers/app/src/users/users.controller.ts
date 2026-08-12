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
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// Modules
import { UsersService } from './users.service';
// DTO's
import { QueriesDTO, UpdateByIdDTO } from './dto';
// Interfaces
import { type TokenPayloadI } from '@library/interfaces';
// Constants
import { ROLEC, PERMISSIONSC } from '@library/constants';
// Guards
import { AuthGuard, RolesGuard, PermissionGuard } from '@library/guards';
// Decorators
import { Roles, Permissions, HttpInterceptor } from '@library/decorators';

// @ApiBearerAuth("")
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.USERS.get)
  // @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: 'Get all the users' })
  public async users(
    @Query(JoiPipe) queries: QueriesDTO,
    @Headers('token-payload') tokenPayload: TokenPayloadI,
  ) {
    return this.usersService.users(queries, tokenPayload);
  }

  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: 'Get a user by ID' })
  public async getById(
    @Param('userId') userId: string,
    @Headers('token-payload') tokenPayload: TokenPayloadI,
  ) {
    return this.usersService.getById(userId, tokenPayload);
  }

  @Patch(':userId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.USERS.updateById)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: 'Update user by ID' })
  public async updateById(
    @Param('userId') userId: string,
    @Body(JoiPipe) payload: UpdateByIdDTO,
    @Headers('token-payload') tokenPayload: TokenPayloadI,
  ) {
    return this.usersService.updateById(userId, payload, tokenPayload);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.USERS.deleteByIds)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: 'Hard deletion of selected ID or multiple ID' })
  public async deleteByIds(@Query('userIds') userIds: string) {
    return this.usersService.deleteByIds(userIds);
  }
}
