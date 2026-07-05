// NestJs Imports
import {
  Get,
  Body,
  Post,
  Param,
  Query,
  Patch,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { JoiPipe } from "nestjs-joi";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
// Shared
import { AuthGuard, HttpInterceptor } from "@crud1/shared";
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
  @UseGuards(AuthGuard)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get all the properties" })
  public async properties(@Query(JoiPipe) queries: QueriesDTO) {
    return this.propertiesService.properties(queries);
  }

  @Get(":propertyId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get a property by ID" })
  public async getById(@Param("propertyId") propertyId: string) {
    return this.propertiesService.getById(propertyId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Create a property" })
  public async create(@Body(JoiPipe) payload: CreateDTO) {
    return this.propertiesService.create(payload);
  }

  @Patch(":propertyId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Update property by ID" })
  public async updateById(
    @Param("propertyId") propertyId: string,
    @Body(JoiPipe) payload: UpdateByIdDTO,
  ) {
    return this.propertiesService.updateById(propertyId, payload);
  }

  @Delete()
  @HttpCode(200)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Delete property by ID" })
  public async deleteByIds(@Query("propertyIds") propertyIds: string) {
    return this.propertiesService.deleteByIds(propertyIds);
  }
}
