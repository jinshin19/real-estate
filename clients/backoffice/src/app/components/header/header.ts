const ModeC = ['light', 'dark'] as const;

import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentWeatherSunny, fluentWeatherMoon } from '@ng-icons/fluent-ui';
// Libs
import { HlmToggleGroupImports } from '@libs';

@Component({
  selector: 'app-header',
  imports: [NgIcon, HlmToggleGroupImports],
  templateUrl: './header.html',
  styleUrl: './header.css',
  providers: [
    provideIcons({
      fluentWeatherMoon,
      fluentWeatherSunny,
    }),
  ],
})
export class Header {
  public readonly headerTitle = input.required();

  protected switchTheme(mode: ModeT) {
    if (mode === 'light') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }
}

type ModeT = (typeof ModeC)[number];
