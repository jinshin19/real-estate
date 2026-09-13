// Angular Imports
import { throwError } from 'rxjs';
import { toast } from '@spartan-ng/brain/sonner';
import { Component, inject, input, signal } from '@angular/core';
// Api's
import { EndpointsService } from '@api';
// Library
import { ListingFilterI, PropertyI } from '@library';
// Components
import { PropertyManagementCard } from '../property-management-card/property-management-card';
import { PropertyManagementTable } from '../property-management-table/property-management-table';

@Component({
  selector: 'app-property-management-listing',
  imports: [PropertyManagementCard, PropertyManagementTable],
  templateUrl: './property-management-listing.html',
  styleUrl: './property-management-listing.css',
})
export class PropertyManagementListing {
  private endpointsService = inject(EndpointsService);

  protected properties = signal<PropertyI[]>([]);

  public readonly mode = input<ListingFilterI>({
    module: 'property-management',
    mode: 'list',
  });

  protected onList() {
    this.endpointsService._endpointC.properties.get
      .list({
        apiService: this.endpointsService,
      })
      .subscribe({
        next: (response) => {
          const body = response.body;
          this.properties.set(body?.data?.items ?? []);
        },
        error: (error) => {
          console.log('Property Onlist Error:', error);
          toast.error(error?.statusText || error?.message);
          return throwError(() => error);
        },
      });
  }

  public ngOnInit() {
    this.onList();
  }
}
