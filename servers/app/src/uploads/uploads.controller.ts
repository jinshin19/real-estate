// NestJs Imports
import {
  Post,
  Query,
  Delete,
  Headers,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
// DTO's
import { DeleteDTO } from './dto';
// Interfaces
import { type TokenPayloadI } from '@library/interfaces';
// Constants
import { PERMISSIONSC, ROLEC } from '@library/constants';
// Modules
import { UploadFilesI, UploadsService } from './uploads.service';
// Guards
import { AuthGuard, PermissionGuard, RolesGuard } from '@library/guards';
// Decorators
import { HttpInterceptor, Permissions, Roles } from '@library/decorators';

// @ApiBearerAuth("")
@ApiTags('Uploads')
@Controller('uploads')
@UseInterceptors(HttpInterceptor)
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data')
  @Roles(ROLEC.agent, ROLEC.admin)
  @Permissions(PERMISSIONSC.UPLOADS.uploads)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiOperation({ summary: 'Upload files' })
  public async uploads(
    @UploadedFiles(JoiPipe) files: UploadFilesI[],
    @Headers('token-payload') tokenPayload: TokenPayloadI,
  ) {
    return this.uploadsService.uploads(files, tokenPayload);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @Roles(ROLEC.agent, ROLEC.admin)
  @Permissions(PERMISSIONSC.UPLOADS.deleteByIds)
  @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
  @ApiOperation({ summary: 'Delete upload files by ids' })
  public async deleteByIds(
    @Query(JoiPipe) queries: DeleteDTO,
    @Headers('token-payload') tokenPayload: TokenPayloadI,
  ) {
    return this.uploadsService.deleteByIds(queries, tokenPayload);
  }
}
