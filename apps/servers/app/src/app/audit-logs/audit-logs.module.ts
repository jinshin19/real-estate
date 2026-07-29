// NestJs Imports
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
// Modules
import { AuditLogsService } from "./audit-logs.service";
import { AuditLogsController } from "./audit-logs.controller";
// Library
import {
  // Schema
  AuditLogs,
  AuditLogsSchema,
} from "@servers/library";

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
