// Angular Imports
import { Component, input } from '@angular/core';
// Library
import { PropertyI } from '@library';
// Libs
import { HlmCheckboxImports, HlmTableImports } from '@libs';

@Component({
  selector: 'app-property-management-table',
  imports: [HlmCheckboxImports, HlmTableImports],
  templateUrl: './property-management-table.html',
  styleUrl: './property-management-table.css',
})
export class PropertyManagementTable {
  public properties = input.required<PropertyI[]>();
}
