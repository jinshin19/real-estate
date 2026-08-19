// NestJs Imports
import { Module } from '@nestjs/common';
// Modules
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
// Services
import { ImageKitService, JWTModule } from '@library/services';

@Module({
  imports: [JWTModule],
  controllers: [UploadsController],
  providers: [UploadsService, ImageKitService],
})
export class UploadsModule {}
