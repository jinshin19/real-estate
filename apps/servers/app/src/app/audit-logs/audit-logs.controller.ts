// NestJs Imports
import {
  Get,
  Post,
  Body,
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
import { AuditLogsService } from "./audit-logs.service";

// @ApiBearerAuth("")
@ApiTags("Audit Logs")
@Controller("audit-logs")
export class AuditLogsController {
  constructor(private auditLogsService: AuditLogsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get all the audit logs" })
  public async auditLogs() {
    return this.auditLogsService.auditLogs();
  }

  @Get(":auditLogId")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Get a audit log by ID" })
  public async getById(@Param("auditLogId") auditLogId: string) {
    return this.auditLogsService.getById(auditLogId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Create an audit log" })
  public async create(@Body(JoiPipe) payload: CreateDTO) {
    return this.auditLogsService.create(payload);
  }

  @Delete(":auditLogId")
  @HttpCode(200)
  @UseInterceptors(HttpInterceptor)
  @ApiOperation({ summary: "Delete audit log by ID" })
  public async deleteById(@Param("auditLogId") auditLogId: string) {
    return this.auditLogsService.deleteById(auditLogId);
  }
}
