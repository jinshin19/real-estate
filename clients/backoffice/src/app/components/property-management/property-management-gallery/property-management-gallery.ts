// Angular Imports
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideImage } from '@ng-icons/lucide';
import { BrnDialogState } from '@spartan-ng/brain/dialog';
import { Component, input, output, signal } from '@angular/core';
// Libs
import { HlmCarouselImports, HlmDialogImports } from '@libs';

@Component({
  selector: 'app-property-management-gallery',
  imports: [NgIcon, HlmDialogImports, HlmCarouselImports],
  templateUrl: './property-management-gallery.html',
  styleUrl: './property-management-gallery.css',
  providers: [
    provideIcons({
      lucideImage,
    }),
  ],
})
export class PropertyManagementGallery {
  public readonly images = input<string[]>([]);
  public readonly alt = input('');
  public readonly editable = input(false);
  public readonly remove = output<number>();

  protected readonly selectedIndex = signal(0);
  protected readonly dialogState = signal<BrnDialogState>('closed');
}
