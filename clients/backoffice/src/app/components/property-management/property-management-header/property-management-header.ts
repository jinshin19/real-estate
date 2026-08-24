// Angular Imports
import { Component, output, signal } from '@angular/core';
import { lucidePlus } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
// Libs
import { HlmButtonImports } from '@libs';
// Components
import { Header } from '@components/header/header';

@Component({
  selector: 'app-property-management-header',
  imports: [Header, NgIcon, HlmButtonImports],
  templateUrl: './property-management-header.html',
  styleUrl: './property-management-header.css',
  providers: [
    provideIcons({
      lucidePlus,
    }),
  ],
})
export class PropertyManagementHeader {
  public readonly createPropertyModal = output<string>();

  protected onOpen = () => {
    this.createPropertyModal.emit('open');
  };
}
