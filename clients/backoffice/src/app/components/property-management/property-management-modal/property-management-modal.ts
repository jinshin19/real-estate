// Angular Imports
import { BrnDialogState } from '@spartan-ng/brain/dialog';
import { Component, model, signal } from '@angular/core';
// Libs
import { HlmButtonImports, HlmDialogImports, HlmFieldImports } from '@libs';
import { HlmInputImports } from 'spartan-ng/helm/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
@Component({
  selector: 'app-property-management-modal',
  imports: [HlmDialogImports, HlmFieldImports, HlmButtonImports, HlmInputImports, NgIcon],
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

  - Create a image util helper that maybe accepts, how many Image, what accepted types, array of accept mimetype 
  - loop the images, check for file size, mimetype, return the invalid image name, index, for forntend display etc,
  - if all condition met, proceed upload.
  - use carousel if there are more images

  onImageSelect(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (!files || files.length === 0) {
      return;
    }

    this.propertyImageError.set(null);

    const selectedFiles = Array.from(files);

    const remainingSlots = this.MAX_IMAGES - this.images().length;

    console.log('remaining slots', {
      remainingSlots,
      images: this.images().length,
    });

    if (remainingSlots <= 0) {
      this.propertyImageError.set(`You can only add up to ${this.MAX_IMAGES} photos.`);

      inputElement.value = '';
      return;
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    const invalidFiles = filesToAdd.filter(
      (file) => !this.isValidImageType(file) || file.size > this.MAX_IMAGE_SIZE,
    );

    if (invalidFiles.length > 0) {
      this.propertyImageError.set(
        'Some photos were skipped. Only JPG, PNG, and WEBP images up to 10 MB are allowed.',
      );
    }

    const validFiles = filesToAdd.filter(
      (file) => this.isValidImageType(file) && file.size <= this.MAX_IMAGE_SIZE,
    );

    const newImages: ImageI[] = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    this.images.update((images) => [...images, ...newImages]);

    // For now, log the actual File objects.
    console.log(
      'Property images:',
      this.images().map((image) => image.file),
    );

    // Allow selecting the same file again after removing it.
    inputElement.value = '';
  }

  removePropertyImage(index: number): void {
    const images = this.images();
    const image = images[index];

    if (!image) {
      return;
    }

    // Release the browser's object URL.
    URL.revokeObjectURL(image.previewUrl);

    this.images.update((currentImages) => currentImages.filter((_, i) => i !== index));

    console.log(
      'Property images:',
      this.images().map((image) => image.file),
    );
  }

  private isValidImageType(file: File): boolean {
    return ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
  }
}
interface ImageI {
  id: string;
  file: File;
  previewUrl: string;
}
