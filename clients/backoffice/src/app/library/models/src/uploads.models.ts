// Api
import { BASE_URL } from '../../../api/api';
// Interfaces
import type { ModelsI } from '../../interfaces/src/models.interfaces';

const url = `${BASE_URL}/uploads`;

export const UploadPostEndpointsC = {
  upload: ({ apiService, body }: UploadPropertyImageI) =>
    apiService.onPostForm<UploadedPropertyImageI[]>({
      url,
      body,
    }),
};

interface UploadPropertyImageI extends ModelsI {
  body: FormData;
}

export interface UploadedPropertyImageI {
  id: string;
  name: string;
  url: string;
}
