// Angular Imports
import { throwError } from 'rxjs';
import { toast } from '@spartan-ng/brain/sonner';
import { Injectable, signal } from '@angular/core';
// Interfaces
import { UploadedPropertyImageI, type PropertyI } from '../../models';
// Api
import { EndpointsService } from '../../../api/api.service';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  constructor(private endpointService: EndpointsService) {
    this.onList({
      page: 1,
    });
  }

  // States
  public properties = signal<PropertyI[]>([]);
  public propertyCurrentPage = signal<number>(1);

  public onList(params: OnListI) {
    return this.endpointService._endpointC.properties.get
      .list({
        apiService: this.endpointService,
        page: params?.page || 1,
        limit: params?.limit || 25,
      })
      .subscribe({
        next: (response) => {
          const body = response.body;
          const data = body?.data;
          const items = data?.items;
          const page = data?.metadata.page || 1;

          this.propertyCurrentPage.set(page);
          this.properties.set(items as PropertyI[]);
        },
        error: (error) => {
          console.log('Property Service Onlist Error:', error);
          toast.error(error?.statusText || error?.message);
          return throwError(() => error);
        },
      });
  }

  public onGetById(propertyId: string) {
    return this.endpointService._endpointC.properties.get.getById({
      apiService: this.endpointService,
      propertyId,
    });
  }

  public onCreate(params: OnCreateI) {
    return this.endpointService._endpointC.properties.post.create({
      apiService: this.endpointService,
      payload: params,
    });
  }

  public onUpdate(params: OnUpdateI) {
    return this.endpointService._endpointC.properties.patch.updateById({
      apiService: this.endpointService,
      propertyId: params.propertyId,
      payload: params.payload,
    });
  }

  public onDelete(propertyIds: string[]) {
    return this.endpointService._endpointC.properties.delete.deleteByIds({
      apiService: this.endpointService,
      propertyIds,
    });
  }

  public onUpload(files: File | File[] | ReadonlyArray<{ file: File }>) {
    const formData = new FormData();
    const list =
      files instanceof File
        ? [files]
        : files.map((item) => (item instanceof File ? item : item.file));

    list.forEach((file) => {
      formData.append('files', file, file.name);
    });

    return this.endpointService._endpointC.uploads.post.upload({
      apiService: this.endpointService,
      body: formData,
    });
  }

  public onPreviousPage() {
    if (this.propertyCurrentPage() === 1) {
      return;
    }

    this.propertyCurrentPage.update((page) => page - 1);

    this.onList({
      page: this.propertyCurrentPage(),
    });
  }

  public onNextPage() {
    this.propertyCurrentPage.update((page) => page + 1);

    this.onList({
      page: this.propertyCurrentPage(),
    });
  }
}

interface OnListI {
  page: number;
  limit?: number;
}

interface OnCreateI {
  title: string;
  type?: string | null | undefined;
}

interface OnUpdateI {
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
