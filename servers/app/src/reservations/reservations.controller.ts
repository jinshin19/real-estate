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
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// Interfaces
import { type TokenPayloadI } from '@library/interfaces';
// Constants
import { ROLEC, PERMISSIONSC } from '@library/constants';
// DTO's
import { CreateDTO, QueriesDTO, UpdateByIdDTO } from './dto';
// Modules
import { ReservationsService } from './reservations.service';
// Guards
import { AuthGuard, RolesGuard, PermissionGuard } from '@library/guards';
// Decorators
import { Roles, Permissions, HttpInterceptor } from '@library/decorators';

// @ApiBearerAuth("")
@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.RESERVATIONS.reservations)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: 'Get all the reservations' })
  public async reservations(
    @Query(JoiPipe) queries: QueriesDTO,
    @Headers('token-payload') tokenPayload: TokenPayloadI,
  ) {
    return this.reservationsService.reservations(queries, tokenPayload);
  }

  @Get(':reservationId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.RESERVATIONS.getById)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: 'Get a reservation by ID' })
  public async getById(
    @Param('reservationId') reservationId: string,
    @Headers('token-payload') tokenPayload: TokenPayloadI,
  ) {
    return this.reservationsService.getById(reservationId, tokenPayload);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.RESERVATIONS.create)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: 'Create reservation' })
  public async create(
    @Body(JoiPipe) payload: CreateDTO,
    @Headers('token-payload') tokenPayload: TokenPayloadI,
  ) {
    return this.reservationsService.create(payload, tokenPayload);
  }

  @Patch(':reservationId')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.RESERVATIONS.updateById)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: 'Update reservation by ID' })
  public async updateById(
    @Param('reservationId') reservationId: string,
    @Body(JoiPipe) payload: UpdateByIdDTO,
    @Headers('token-payload') tokenPayload: TokenPayloadI,
  ) {
    return this.reservationsService.updateById(
      reservationId,
      payload,
      tokenPayload,
    );
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @Permissions(PERMISSIONSC.RESERVATIONS.deleteByIds)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @Roles(ROLEC.agent, ROLEC.admin, ROLEC.superadmin)
  @ApiOperation({ summary: 'Hard deletion of selected ID or multiple ID' })
  public async deleteByIds(@Query('reservationIds') reservationIds: string) {
    return this.reservationsService.deleteByIds(reservationIds);
  }
}
