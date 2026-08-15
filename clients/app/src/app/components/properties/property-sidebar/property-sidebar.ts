// Angular Imports
import { Component, signal } from '@angular/core';
import { HlmSidebarImports } from '../../../../../libs/ui/sidebar/src';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBath,
  lucideHouse,
  lucideInbox,
  lucideSearch,
  lucideSettings,
  lucideCalendar,
} from '@ng-icons/lucide';
import { HlmInputImports } from 'spartan-ng/helm/input';
import { HlmSliderImports } from '../../../../../libs/ui/slider/src';
import { HlmFieldImports } from '../../../../../libs/ui/field/src';
import { HlmSelectImports } from '../../../../../libs/ui/select/src';
import { HlmCheckboxImports } from '../../../../../libs/ui/checkbox/src';
import { HlmRadioGroupImports } from '../../../../../libs/ui/radio-group/src';
import { HlmInputGroupImports } from '../../../../../libs/ui/input-group/src';
import { fluentBed, fluentLocation, fluentSearch } from '@ng-icons/fluent-ui';

@Component({
  selector: 'app-property-sidebar',
  imports: [
    NgIcon,
    HlmInputImports,
    HlmFieldImports,
    HlmSelectImports,
    HlmSliderImports,
    HlmSidebarImports,
    HlmCheckboxImports,
    HlmRadioGroupImports,
    HlmInputGroupImports,
  ],
  templateUrl: './property-sidebar.html',
  styleUrl: './property-sidebar.css',
  providers: [
    provideIcons({
      fluentBed,
      lucideBath,
      lucideHouse,
      lucideInbox,
      lucideSearch,
      fluentSearch,
      lucideSettings,
      fluentLocation,
      lucideCalendar,
    }),
  ],
})
export class PropertySidebar {
  protected readonly _items = [
    {
      title: 'Home',
      url: '#',
      icon: 'lucideHouse',
    },
    {
      title: 'Inbox',
      url: '#',
      icon: 'lucideInbox',
    },
    {
      title: 'Calendar',
      url: '#',
      icon: 'lucideCalendar',
    },
    {
      title: 'Search',
      url: '#',
      icon: 'lucideSearch',
    },
    {
      title: 'Settings',
      url: '#',
      icon: 'lucideSettings',
    },
  ];

  public readonly fruits = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grapes', value: 'grapes' },
    { label: 'Pineapple', value: 'pineapple' },
  ];

  // In the database pull all the "cities" flatmap if necessary and display all the when the select city is clicked

  public readonly sliderValue = signal([0, 20000]);
}
