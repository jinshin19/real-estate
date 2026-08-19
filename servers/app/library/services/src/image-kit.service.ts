// NestJs Imports
import ImageKit from '@imagekit/nodejs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageKitService {
  private readonly imageKit = new ImageKit({
    privateKey: process.env.JINSHIN19_REAL_ESTATE_IMAGE_KIT_PRIVATE_KEY!,
  });

  async upload({
    buffer,
    name,
    type,
  }: ImageKitUploadI): Promise<ImageKit.FileUpdateResponse | null> {
    try {
      const base64 = `data:${type};base64,${buffer.toString('base64')}`;

      return await this.imageKit.files.upload({
        file: base64,
        fileName: name,
        folder: process.env.JINSHIN19_REAL_ESTATE_IMAGE_KIT_FOLDER,
        customMetadata: {},
      });
    } catch (error) {
      console.log('ImageKitService:upload:error:', error);
      return null;
    }
  }

  async delete({ id }: ImageKitDeleteI): Promise<void | null> {
    try {
      return await this.imageKit.files.delete(id);
    } catch (error) {
      console.log('ImageKitService:delete:error:', error);
      return null;
    }
  }
}

interface ImageKitUploadI {
  buffer: Buffer;
  name: string;
  type: string;
}

interface ImageKitDeleteI {
  id: string;
}
