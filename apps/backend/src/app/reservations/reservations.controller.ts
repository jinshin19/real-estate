// NestJs Imports
import {
  Get,
  Body,
  Post,
  Param,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  UseInterceptors,
} from "@nestjs/common";
import { JoiPipe } from "nestjs-joi";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
// Shared
import {
  // Decorators
  HttpInterceptor,
} from "@crud1/shared";
// DTO's
import { CreateDTO } from "./dto";
// Modules
import { ReservationsService } from "./reservations.service";

// @ApiBearerAuth("")
@ApiTags("Reservations")
@Controller("reservations")
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get all the reservations" })
  public async reservations() {
    return this.reservationsService.reservations();
  }

  @Get(":reservationId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get a reservation by ID" })
  public async getById(@Param("reservationId") reservationId: string) {
    return this.reservationsService.getById(reservationId);
  }

  @Post(":reservationId")
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Create reservation" })
  public async create(@Body(JoiPipe) payload: CreateDTO) {
    return this.reservationsService.create(payload);
  }

  @Delete(":reservationId")
  @HttpCode(200)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Delete reservation by ID" })
  public async deleteById(@Param("reservationId") reservationId: string) {
    return this.reservationsService.deleteById(reservationId);
  }
}
