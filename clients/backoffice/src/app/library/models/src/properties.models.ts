// Api
import { BASE_URL } from '../../../api/api';
// Interfaces
import type { ModelsI } from '../../interfaces/src/models.interfaces';

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
};

export const PropertyPostEndpointsC = {
  create: ({ apiService, payload }: CreatePropertyI) =>
    apiService.onPost({
      url,
      body: payload,
    }),
};

interface ListI extends ModelsI {
  page?: number;
  limit?: number;
}

interface CreatePropertyI extends ModelsI {
  payload: {
    title: string;
    type?: string | null | undefined;
  };
}

// -------------------------------------
export interface PropertyI {
  id: string;
  title: string;
  description: string;

  projectId: string;
  houseModelId: string;

  price: number;
  reservationFee: number;

  status: PropertyStatusE;

  isFeatured: boolean;
  isPublished: boolean;

  location: PropertyLocationI;
  images: string[];
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
