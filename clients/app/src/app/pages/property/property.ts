// Angular Imports
import { Component } from '@angular/core';
// Components
import { PropertyHeader } from '../../components/properties/property-header/property-header';
import { PropertySidebar } from '../../components/properties/property-sidebar/property-sidebar';
import { PropertyListing } from '../../components/properties/property-listing/property-listing';
import { PropertyPagination } from '../../components/properties/property-pagination/property-pagination';

@Component({
  selector: 'app-property',
  imports: [PropertyHeader, PropertySidebar, PropertyListing, PropertyPagination],
  templateUrl: './property.html',
  styleUrl: './property.css',
})
export class Property {}
