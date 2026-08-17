// Angular Imports
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentLocation } from '@ng-icons/fluent-ui';
// Library
import { ListingFilterT } from '@library';
// Libs
import { HlmCardImports, HlmBadgeImports } from '@libs';

@Component({
  selector: 'app-property-management-card',
  imports: [NgIcon, HlmCardImports, RouterLink, HlmBadgeImports],
  templateUrl: './property-management-card.html',
  styleUrl: './property-management-card.css',
  providers: [
    provideIcons({
      fluentLocation,
    }),
  ],
})
export class PropertyManagementCard {
  public readonly mode = input<ListingFilterT>();
}
