// Angular Imports
import { Component, input } from '@angular/core';
// Library
import { ListingFilterI } from '@library';
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
  public readonly items = Array.from({ length: 25 }, (_, i) => i + 1);
  public readonly mode = input<ListingFilterI>({
    module: 'property-management',
    mode: 'list',
  });
}
