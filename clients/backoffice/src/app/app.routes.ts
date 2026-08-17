// Angular Imports
import { Routes } from '@angular/router';
// Pages
import { Login } from './pages/auth/login/login';
import { Dashboard } from './pages/private/dashboard/dashboard';
import { PropertyManagement } from './pages/private/property-management/property-management';

export const routes: Routes = [
  // Public Routes
  {
    path: 'login',
    component: Login,
  },

  // Private Routes
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: '',
        redirectTo: 'property-management',
        pathMatch: 'full',
      },
      {
        path: 'property-management',
        component: PropertyManagement,
      },
    ],
  },
];
