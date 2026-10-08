import { Component, inject, input } from '@angular/core';
// Library
import { ListingFilterI, PropertyI, PropertyService } from '@library';
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
  protected propertyService = inject(PropertyService);

  public readonly mode = input<ListingFilterI>({
    module: 'property-management',
    mode: 'list',
  });
}
