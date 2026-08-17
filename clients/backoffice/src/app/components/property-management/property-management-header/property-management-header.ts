// Angular Imports
import { Component } from '@angular/core';
// Components
import { Header } from '@components/header/header';

@Component({
  selector: 'app-property-management-header',
  imports: [Header],
  templateUrl: './property-management-header.html',
  styleUrl: './property-management-header.css',
})
export class PropertyManagementHeader {}
