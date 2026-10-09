import { Component, inject, input, output } from '@angular/core';
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

  public readonly selectedIds = input<string[]>([]);
  public readonly view = output<PropertyI>();
  public readonly edit = output<PropertyI>();
  public readonly delete = output<PropertyI>();
  public readonly toggle = output<ToggleI>();
  public readonly toggleAll = output<boolean>();

  protected onView(property: PropertyI) {
    this.view.emit(property);
  }

  protected onEdit(property: PropertyI) {
    this.edit.emit(property);
  }

  protected onDelete(property: PropertyI) {
    this.delete.emit(property);
  }

  protected onToggle(event: ToggleI) {
    this.toggle.emit(event);
  }

  protected onToggleAll(checked: boolean) {
    this.toggleAll.emit(checked);
  }
}

interface ToggleI {
  property: PropertyI;
  checked: boolean;
}
