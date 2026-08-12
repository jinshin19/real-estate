// Angular Imports
import { Routes } from '@angular/router';
// Pages
import { Home } from './pages/home/home';
import { Property } from './pages/property/property';
import { PropertyDetails } from './pages/property-details/property-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'properties',
    component: Property,
  },
  {
    path: 'properties/:propertyId',
    component: PropertyDetails,
  },
];
