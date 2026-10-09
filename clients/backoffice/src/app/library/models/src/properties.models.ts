// Api
import { BASE_URL } from '../../../api/api';
// Interfaces
import type { ModelsI } from '../../interfaces/src/models.interfaces';
import { UploadedPropertyImageI } from './uploads.models';

const url = `${BASE_URL}/properties`;

export const PropertyGetEndpointsC = {
  list: ({ apiService, page = 1, limit = 25 }: ListI) =>
    apiService.onList<PropertyI>({
      url,
      options: {
        params: {
          page,
          limit,
        },
      },
    }),
  getById: ({ apiService, propertyId }: GetByIdI) =>
    apiService.onGet<PropertyI>({
      url: `${url}/${propertyId}`,
    }),
};

export const PropertyPostEndpointsC = {
  create: ({ apiService, payload }: CreatePropertyI) =>
    apiService.onPost<PropertyI>({
      url,
      body: payload,
    }),
};

export const PropertyPatchEndpointsC = {
  updateById: ({ apiService, propertyId, payload }: UpdatePropertyI) =>
    apiService.onPatch<PropertyI>({
      url: `${url}/${propertyId}`,
      body: payload,
    }),
};

export const PropertyDeleteEndpointsC = {
  deleteByIds: ({ apiService, propertyIds }: DeleteByIdsI) =>
    apiService.onDelete({
      url,
      options: {
        params: {
          propertyIds: propertyIds.join(','),
        },
      },
    }),
};

interface ListI extends ModelsI {
  page?: number;
  limit?: number;
}

interface GetByIdI extends ModelsI {
  propertyId: string;
}

interface CreatePropertyI extends ModelsI {
  payload: {
    title: string;
    type?: string | null | undefined;
  };
}

interface DeleteByIdsI extends ModelsI {
  propertyIds: string[];
}

interface UpdatePropertyI extends ModelsI {
  propertyId: string;
  payload: {
    title?: string;
    description?: string;
    price?: number;
    location?: {
      street?: string;
      city?: string;
      province?: string;
      zipCode?: string;
    };
    images?: UploadedPropertyImageI[];
  };
}

// -------------------------------------
export interface PropertyI {
  id: string;
  title: string;
  type?: string | null;
  description: string;

  projectId: string;
  houseModelId: string;

  price: number;
  reservationFee: number;

  status: PropertyStatusE;

  isFeatured: boolean;
  isPublished: boolean;

  location: PropertyLocationI;
  images: (string | UploadedPropertyImageI)[];
  features: string[];
  specifications: PropertySpecificationsI;

  createdBy: string;
}

export interface PropertyLocationI {
  country: string;
  province: string;
  city: string;
  barangay: string;
  street: string;
  zipCode: string;
}

export interface PropertySpecificationsI {
  lotArea: string;
  floodArea: string;
  bedrooms: number;
  garageSlot: number;
  floors: number;
}

export type PropertyStatusE = 'available' | 'reserved' | 'sold' | 'unavailable';
