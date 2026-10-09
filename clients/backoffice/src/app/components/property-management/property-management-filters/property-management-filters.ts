// Angular Imports
import { lucideTrash2 } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Component, input, output } from '@angular/core';
import { fluentAppsList, fluentGrid } from '@ng-icons/fluent-ui';
// Libs
import { HlmButtonImports, HlmTabsImports } from '@libs';
// Library
import { ListingFilterI, ListingFilterT } from '@library';

@Component({
  selector: 'app-property-management-filters',
  imports: [HlmTabsImports, HlmButtonImports, NgIcon],
  templateUrl: './property-management-filters.html',
  styleUrl: './property-management-filters.css',
  providers: [
    provideIcons({
      fluentGrid,
      lucideTrash2,
      fluentAppsList,
    }),
  ],
})
export class PropertyManagementFilters {
  public readonly selectedCount = input(0);
  protected readonly mode = output<ListingFilterI>();
  public readonly deleteSelected = output<void>();

  protected onSwitch(mode: ListingFilterT) {
    this.mode.emit({
      module: 'property-management',
      mode,
    });
  }

  protected onDeleteSelected() {
    this.deleteSelected.emit();
  }
}
