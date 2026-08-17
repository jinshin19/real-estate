// Angular Imports
import { Component, signal } from '@angular/core';
// Library
import { ListingFilterI } from '@library';
// Components
import { PropertyManagementHeader } from '@components/property-management/property-management-header/property-management-header';
import { PropertyManagementListing } from '@components/property-management/property-management-listing/property-management-listing';
import { PropertyManagementFilters } from '@components/property-management/property-management-filters/property-management-filters';
import { PropertyManagementPagination } from '@components/property-management/property-management-pagination/property-management-pagination';

@Component({
  selector: 'app-property-management',
  imports: [
    PropertyManagementHeader,
    PropertyManagementListing,
    PropertyManagementFilters,
    PropertyManagementPagination,
  ],
  templateUrl: './property-management.html',
  styleUrl: './property-management.css',
})
export class PropertyManagement {
  protected mode = signal<ListingFilterI>({
    module: 'property-management',
    mode: 'list',
  });

  protected onModeChange(mode: ListingFilterI) {
    this.mode.update((prev) => ({ ...prev, ...mode }));
  }
}
