// Angular Imports
import { Component } from '@angular/core';
// Libs
import { HlmPaginationImports, HlmSelectImports } from '@libs';

@Component({
  selector: 'app-property-management-pagination',
  imports: [HlmPaginationImports, HlmSelectImports],
  templateUrl: './property-management-pagination.html',
  styleUrl: './property-management-pagination.css',
})
export class PropertyManagementPagination {}
