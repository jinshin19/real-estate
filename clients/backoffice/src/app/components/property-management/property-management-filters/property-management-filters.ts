// Angular Imports
import { Component, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentAppsList, fluentGrid } from '@ng-icons/fluent-ui';
// Libs
import { HlmTabsImports } from '@libs';
// Library
import { ListingFilterI, ListingFilterT } from '@library';

@Component({
  selector: 'app-property-management-filters',
  imports: [HlmTabsImports, NgIcon],
  templateUrl: './property-management-filters.html',
  styleUrl: './property-management-filters.css',
  providers: [
    provideIcons({
      fluentGrid,
      fluentAppsList,
    }),
  ],
})
export class PropertyManagementFilters {
  protected readonly mode = output<ListingFilterI>();

  protected onSwitch(mode: ListingFilterT) {
    this.mode.emit({
      module: 'property-management',
      mode,
    });
  }
}
