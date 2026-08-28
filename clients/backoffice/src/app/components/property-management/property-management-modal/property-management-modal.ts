// Angular Imports
import { lucidePlus } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmInputImports } from 'spartan-ng/helm/input';
import { Component, model, signal } from '@angular/core';
import { BrnDialogState } from '@spartan-ng/brain/dialog';
// Utils
import { ValidateImagesU } from '@library';
// Libs
import { HlmButtonImports, HlmCarouselImports, HlmDialogImports, HlmFieldImports } from '@libs';
@Component({
  selector: 'app-property-management-modal',
  imports: [
    NgIcon,
    HlmFieldImports,
    HlmInputImports,
    HlmDialogImports,
    HlmButtonImports,
    HlmCarouselImports,
  ],
  templateUrl: './property-management-modal.html',
  styleUrl: './property-management-modal.css',
  providers: [
    provideIcons({
      lucidePlus,
    }),
  ],
})
export class PropertyManagementModal {
  public createPropertyModalState = model<BrnDialogState | null>(null);

  readonly MAX_IMAGES = 10;
  readonly MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

  protected images = signal<ImageI[]>([]);
  propertyImageError = signal<string | null>(null);

  onImageSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (!files || files.length === 0) {
      return;
    }

    const isPassed = ValidateImagesU({
      files,
      types: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    });

    if (!isPassed) return;

    const newImages = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    this.images.update((images) => [...images, ...newImages]);

    inputElement.value = '';
  }

  removePropertyImage(index: number): void {
    const images = this.images();
    const image = images[index];

    if (!image) {
      return;
    }

    URL.revokeObjectURL(image.previewUrl);

    this.images.update((currentImages) => currentImages.filter((_, i) => i !== index));
  }
}
interface ImageI {
  id: string;
  file: File;
  previewUrl: string;
}
