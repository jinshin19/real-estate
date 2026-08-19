// NestJs Imports
import { HttpStatus, Injectable } from '@nestjs/common';
// Schema
import { PropertyImagesI } from '@library/schema';
// Handlers
import {
  type ResponseHandlerI,
  ResponseHandlerService,
} from '@library/handlers';
// Constants
import {
  MaxFileSizeC,
  AllowedFileTypesC,
  RESPONSE_MESSAGES,
} from '@library/constants';
// DTO's
import { DeleteDTO } from './dto';
// Interfaces
import { type TokenPayloadI } from '@library/interfaces';
import { ImageKitService } from '@library/services';

@Injectable()
export class UploadsService {
  private readonly serviceName = 'UploadsService';

  constructor(private readonly imageKitService: ImageKitService) {}

  public async uploads(
    files: UploadFilesI[],
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.uploads.name;

    const uploadedFiles: PropertyImagesI[] = [];

    try {
      if (!files.length) {
        return ResponseHandlerService({
          status: HttpStatus.BAD_REQUEST,
          success: false,
          message: RESPONSE_MESSAGES.ERROR.FILE_REQUIRED,
        });
      }

      for (const file of files) {
        // Check file size
        if (file.size > MaxFileSizeC) {
          console.log(file.originalname);
          return ResponseHandlerService({
            status: HttpStatus.BAD_REQUEST,
            success: false,
            message: `${file.originalname} is too large. ${RESPONSE_MESSAGES.ERROR.FILE_SIZE_EXCEEDED}`,
          });
        }

        // Check file type
        if (!AllowedFileTypesC.includes(file.mimetype as UploadFileTypeT)) {
          return ResponseHandlerService({
            status: HttpStatus.BAD_REQUEST,
            success: false,
            message: `${file.originalname} is not a supported file type (${file.mimetype}). ${RESPONSE_MESSAGES.ERROR.FILE_TYPE_NOT_SUPPORTED}`,
          });
        }
      }

      await Promise.all(
        files.map(async (file) => {
          const uploadedFile = await this.imageKitService.upload({
            buffer: file.buffer,
            name: file.originalname,
            type: file.mimetype,
          });

          if (!uploadedFile) {
            return ResponseHandlerService({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              success: false,
              message: `Failed to upload ${file.originalname}`,
            });
          }

          const data = {
            id: uploadedFile?.fileId,
            name: uploadedFile?.name,
            url: uploadedFile?.url,
          };
          uploadedFiles.push(data as PropertyImagesI);
        }),
      );

      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.OK,
        data: uploadedFiles,
      });
    } catch (error: unknown) {
      return ResponseHandlerService({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        errorDetails: {
          name: `${this.serviceName}.${methodName}`,
          error,
        },
      });
    }
  }

  public async deleteByIds(
    queries: DeleteDTO,
    tokenPayload: TokenPayloadI,
  ): Promise<ResponseHandlerI> {
    const methodName = this.deleteByIds.name;
    try {
      const { selectedIds } = queries;

      const ids = selectedIds.toString().split(',');

      Promise.all(
        ids.map((id) => {
          this.imageKitService.delete({ id }).then();
        }),
      ).then();

      return ResponseHandlerService({
        status: HttpStatus.OK,
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS.DELETED,
      });
    } catch (error: unknown) {
      return ResponseHandlerService({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER_ERROR,
        errorDetails: {
          name: `${this.serviceName}.${methodName}`,
          error,
        },
      });
    }
  }
}

export interface UploadFilesI {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

type UploadFileTypeT = (typeof AllowedFileTypesC)[number];
