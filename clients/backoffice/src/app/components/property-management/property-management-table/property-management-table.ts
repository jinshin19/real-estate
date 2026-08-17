// Angular Imports
import { Component } from '@angular/core';
// Libs
import { HlmCheckboxImports, HlmTableImports } from '@libs';

@Component({
  selector: 'app-property-management-table',
  imports: [HlmCheckboxImports, HlmTableImports],
  templateUrl: './property-management-table.html',
  styleUrl: './property-management-table.css',
})
export class PropertyManagementTable {
  public readonly properties: any[] = [
    {
      id: 1,
      name: 'Ayala Heights Townhouse',
      reference: 'PROP-0001',
      type: 'Townhouse',
      listing: 'For Sale',
      status: 'Available',
      location: 'Quezon City',
      price: '₱8,500,000',
    },
    {
      id: 2,
      name: 'Greenfield Residence',
      reference: 'PROP-0002',
      type: 'House',
      listing: 'For Rent',
      status: 'Reserved',
      location: 'Mandaluyong',
      price: '₱45,000 / month',
    },
    {
      id: 3,
      name: 'Sunset Villas',
      reference: 'PROP-0003',
      type: 'Condominium',
      listing: 'For Sale',
      status: 'Maintenance',
      location: 'Makati City',
      price: '₱12,200,000',
    },
  ];
}
