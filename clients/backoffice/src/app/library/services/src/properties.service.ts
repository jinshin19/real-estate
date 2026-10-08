// Angular Imports
import { throwError } from 'rxjs';
import { toast } from '@spartan-ng/brain/sonner';
import { Injectable, signal } from '@angular/core';
// Interfaces
import { type PropertyI } from '../../models';
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
