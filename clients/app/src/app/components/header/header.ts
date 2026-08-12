// Angular Imports
import {
  fluentWeatherMoon,
  fluentWeatherSunny,
  fluentBuildingTownhouse,
} from '@ng-icons/fluent-ui';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from 'spartan-ng/helm/button';
import { HlmToggleGroupImports } from '../../../../libs/ui/toggle-group/src';
// Constants
import { NavigationLinksC } from '@library/constants';

@Component({
  selector: 'app-header',
  imports: [NgIcon, HlmToggleGroupImports, HlmButtonImports],
  templateUrl: './header.html',
  styleUrl: './header.css',
  providers: [
    provideIcons({
      fluentWeatherMoon,
      fluentWeatherSunny,
      fluentBuildingTownhouse,
    }),
  ],
})
export class Header {
  protected readonly navigationLinks = NavigationLinksC;
}
