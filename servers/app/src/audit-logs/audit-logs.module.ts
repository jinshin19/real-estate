// NestJs Imports
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Schemas
import { AuditLogs, AuditLogsSchema } from '@library/schema';
// Modules
import { AuditLogsService } from './audit-logs.service';
import { AuditLogsController } from './audit-logs.controller';

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
