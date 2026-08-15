const ModeC = ['light', 'dark'] as const;

// Angular Imports
import {
  fluentWeatherMoon,
  fluentWeatherSunny,
  fluentBuildingTownhouse,
} from '@ng-icons/fluent-ui';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from 'spartan-ng/helm/button';
import { HlmToggleGroupImports } from '../../../../libs/ui/toggle-group/src';
// Constants
import { NavigationLinksC } from '@library/constants';

@Component({
  selector: 'app-header',
  imports: [NgIcon, HlmToggleGroupImports, HlmButtonImports, RouterLink],
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

  protected readonly switchTheme = (mode: ModeT) => {
    if (mode === 'light') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
}

type ModeT = (typeof ModeC)[number];
