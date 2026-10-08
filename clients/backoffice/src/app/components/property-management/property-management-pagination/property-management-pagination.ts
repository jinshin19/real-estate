// Angular Imports
import { Component, inject } from '@angular/core';
// Library
import { PropertyService } from '@library';
// Libs
import { HlmButtonImports, HlmPaginationImports, HlmSelectImports } from '@libs';

@Component({
  selector: 'app-property-management-pagination',
  imports: [HlmPaginationImports, HlmSelectImports, HlmButtonImports],
  templateUrl: './property-management-pagination.html',
  styleUrl: './property-management-pagination.css',
})
export class PropertyManagementPagination {
  protected propertyService = inject(PropertyService);

  protected onPreviousPage() {
    this.propertyService.onPreviousPage();
  }

  protected async onNextPage() {
    this.propertyService.onNextPage();
  }
}
