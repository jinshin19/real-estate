// Angular Imports
import { Component } from '@angular/core';
// Components
import { PropertyHeader } from '../../components/properties/property-header/property-header';
import { PropertySidebar } from '../../components/properties/property-sidebar/property-sidebar';
import { PropertyListing } from '../../components/properties/property-listing/property-listing';

@Component({
  selector: 'app-property',
  imports: [PropertyHeader, PropertySidebar, PropertyListing],
  templateUrl: './property.html',
  styleUrl: './property.css',
})
export class Property {}
