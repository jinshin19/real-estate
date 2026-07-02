// NestJs Imports
import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  HttpCode,
  Controller,
  HttpStatus,
  UseInterceptors,
} from "@nestjs/common";
import { JoiPipe } from "nestjs-joi";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
// Modules
import { PropertiesService } from "./properties.service";
// Shared
import {
  // Decorators
  HttpInterceptor,
} from "@crud1/shared";
// DTO's
import { CreateDTO, UpdateByIdDTO } from "./dto";

// @ApiBearerAuth("")
@ApiTags("Properties")
@Controller("properties")
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get all the properties" })
  public async properties() {
    return this.propertiesService.properties();
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

  @Delete(":propertyId")
  @HttpCode(200)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Delete property by ID" })
  public async deleteById(@Param("propertyId") propertyId: string) {
    return this.propertiesService.deleteById(propertyId);
  }
}
