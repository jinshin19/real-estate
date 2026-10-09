// Angular Imports
import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentLocation } from '@ng-icons/fluent-ui';
import { lucideImage, lucidePencil, lucideTrash2 } from '@ng-icons/lucide';
// Libs
import { HlmBadgeImports, HlmButtonImports, HlmCardImports } from '@libs';
// Library
import { GetPropertyCoverImageU, IsPropertyUnfinishedU, ListingFilterT, PropertyI } from '@library';

@Component({
  selector: 'app-property-management-card',
  imports: [NgIcon, HlmCardImports, HlmBadgeImports, HlmButtonImports],
  templateUrl: './property-management-card.html',
  styleUrl: './property-management-card.css',
  providers: [
    provideIcons({
      lucideImage,
      lucidePencil,
      lucideTrash2,
      fluentLocation,
    }),
  ],
})
export class PropertyManagementCard {
  public property = input.required<PropertyI>();
  public readonly mode = input<ListingFilterT>();
  public readonly hideDelete = input(false);
  public readonly view = output<PropertyI>();
  public readonly edit = output<PropertyI>();
  public readonly delete = output<PropertyI>();

  protected isUnfinished(property: PropertyI) {
    return IsPropertyUnfinishedU(property);
  }

  protected coverImage(property: PropertyI): string | null {
    return GetPropertyCoverImageU(property);
  }

  protected onView(property: PropertyI) {
    this.view.emit(property);
  }

  protected onEdit(property: PropertyI) {
    this.edit.emit(property);
  }

  protected onDelete(property: PropertyI) {
    this.delete.emit(property);
  }
}
