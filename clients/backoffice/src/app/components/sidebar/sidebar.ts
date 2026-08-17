// Angular Imports
import {
  fluentAlert,
  fluentPeople,
  fluentBuilding,
  fluentSettings,
  fluentPersonCircle,
  fluentChatMultiple,
  fluentLockClosedKey,
  fluentCalendarCheckmark,
  fluentArrowRight,
} from '@ng-icons/fluent-ui';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from 'spartan-ng/helm/button';
// Libs
import { HlmSidebarImports } from '@libs';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, HlmSidebarImports, HlmButtonImports, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  providers: [
    provideIcons({
      fluentPeople,
      fluentAlert,
      fluentSettings,
      fluentBuilding,
      fluentPersonCircle,
      fluentChatMultiple,
      fluentLockClosedKey,
      fluentCalendarCheckmark,
      fluentArrowRight,
    }),
  ],
})
export class Sidebar {
  protected readonly _items = [
    {
      title: 'Property Management',
      url: '/property-management',
      icon: 'fluentBuilding',
    },
    {
      title: 'Inquiries',
      url: '/inquiries',
      icon: 'fluentChatMultiple',
    },
    {
      title: 'Reservations',
      url: '/reservations',
      icon: 'fluentCalendarCheckmark',
    },
    {
      title: 'User Management',
      url: '/user-management',
      icon: 'fluentPeople',
    },
    {
      title: 'Roles & Permissions',
      url: '/roles-permissions',
      icon: 'fluentLockClosedKey',
    },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: 'fluentAlert',
    },
    {
      title: 'Account',
      url: '/account',
      icon: 'fluentPersonCircle',
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'fluentSettings',
    },
  ];
}
