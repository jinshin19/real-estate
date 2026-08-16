import { Routes } from '@angular/router';
import { Login } from './auth/login/login';

export const routes: Routes = [
  // Public Routes
  {
    path: 'login',
    component: Login,
  },

  // Private Routes
  // {

  // }
];
