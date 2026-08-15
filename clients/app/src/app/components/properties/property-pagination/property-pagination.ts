// Angular Imports
import { Component } from '@angular/core';
import { HlmSelectImports } from '../../../../../libs/ui/select/src';
import { HlmPaginationImports } from '../../../../../libs/ui/pagination/src';

@Component({
  selector: 'app-property-pagination',
  imports: [HlmPaginationImports, HlmSelectImports],
  templateUrl: './property-pagination.html',
  styleUrl: './property-pagination.css',
})
export class PropertyPagination {}
