// NestJs Imports
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// Modules
import { AuditLogsService } from "./audit-logs.service";
import { AuditLogsController } from "./audit-logs.controller";
// Shared
import {
  // Schema
  AuditLogs,
  AuditLogsSchema,
} from "@crud1/shared";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        // User
        name: AuditLogs.name,
        schema: AuditLogsSchema,
      },
    ]),
  ],
  providers: [AuditLogsService],
  controllers: [AuditLogsController],
})
export class AuditLogsModule {}
