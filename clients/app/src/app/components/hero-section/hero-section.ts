// Angular Imports
import { Component } from '@angular/core';
import { lucideHouse } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from 'spartan-ng/helm/button';
import { HlmFieldImports } from '../../../../libs/ui/field/src';
import { HlmInputImports } from '../../../../libs/ui/input/src';
import { HlmSelectImports } from '../../../../libs/ui/select/src';
import { fluentLocation, fluentSearch } from '@ng-icons/fluent-ui';
import { HlmInputGroupImports } from '../../../../libs/ui/input-group/src';
import { HlmBadgeImports } from '../../../../libs/ui/badge/src';

@Component({
  selector: 'app-hero-section',
  imports: [
    NgIcon,
    HlmFieldImports,
    HlmInputImports,
    HlmBadgeImports,
    HlmSelectImports,
    HlmButtonImports,
    HlmInputGroupImports,
  ],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  providers: [
    provideIcons({
      lucideHouse,
      fluentSearch,
      fluentLocation,
    }),
  ],
})
export class HeroSection {
  public readonly items = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grapes', value: 'grapes' },
    { label: 'Pineapple', value: 'pineapple' },
  ];
  public readonly itemToString = (value: string) =>
    this.items.find((item) => item.value === value)?.label || '';
}
