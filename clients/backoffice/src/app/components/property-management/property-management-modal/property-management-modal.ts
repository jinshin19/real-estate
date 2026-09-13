const ModeC = ['upload', 'save'] as const;
// Angular Imports
import { throwError } from 'rxjs';
import { toast } from '@spartan-ng/brain/sonner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmInputImports } from 'spartan-ng/helm/input';
import { BrnDialogState } from '@spartan-ng/brain/dialog';
import { Component, inject, model, signal } from '@angular/core';
import { ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { lucidePlus, lucideArrowRight, lucideArrowLeft, lucideCheck } from '@ng-icons/lucide';
// Utils
import { ValidateImagesU } from '@library';
// Api's
import { EndpointsService } from '@api';
// Forms
import { CreatePropertyForm } from './property-management-modal.form';
// Libs
import { HlmFieldImports, HlmButtonImports, HlmDialogImports, HlmCarouselImports } from '@libs';
@Component({
  selector: 'app-property-management-modal',
  imports: [
    NgIcon,
    HlmFieldImports,
    HlmInputImports,
    HlmDialogImports,
    HlmButtonImports,
    HlmCarouselImports,
    ReactiveFormsModule,
    ɵInternalFormsSharedModule,
  ],
  templateUrl: './property-management-modal.html',
  styleUrl: './property-management-modal.css',
  providers: [
    provideIcons({
      lucidePlus,
      lucideCheck,
      lucideArrowLeft,
      lucideArrowRight,
    }),
  ],
})
export class PropertyManagementModal {
  private readonly endpointService = inject(EndpointsService);
  public createPropertyModalState = model<BrnDialogState | null>(null);
  // public updatePropertyModalState = model<BrnDialogState | null>(null);
  public updatePropertyModalState = signal<BrnDialogState | null>(null);

  readonly MAX_IMAGES = 10;
  readonly MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

  // Form States
  protected readonly createPropertyForm = CreatePropertyForm();

  protected images = signal<ImageI[]>([]);
  protected readonly step = signal<number>(1);
  protected readonly propertyImageError = signal<string | null>(null);

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

  onRemoveImage(index: number): void {
    const images = this.images();
    const image = images[index];

    if (!image) {
      return;
    }

    URL.revokeObjectURL(image.previewUrl);

    this.images.update((currentImages) => currentImages.filter((_, i) => i !== index));
  }

  onUpload() {
    // this.endpointService._endpointC.properties.post.create(this.endpointService).subscribe({
    //   next: (response) => {
    //     console.log('ON UPLOAD:', response);
    //   },
    //   error: (error) => {
    //     toast.error(error?.message);
    //     return catchError(error);
    //   },
    // });
  }

  onCreate() {
    if (this.createPropertyForm.invalid) {
      this.createPropertyForm.markAsTouched();
      return;
    }

    const payload = this.createPropertyForm.getRawValue();

    this.endpointService._endpointC.properties.post
      .create({
        apiService: this.endpointService,
        payload,
      })
      .subscribe({
        next: (response) => {
          console.log('create property', response);
          this.createPropertyModalState.set('closed');
          this.updatePropertyModalState.set('open');
          //
        },
        error: (error) => {
          console.log('Property OnCreate Error:', error);
          toast.error(error?.statusText || error?.message);
          return throwError(() => error);
        },
      });
  }
}

interface ImageI {
  id: string;
  file: File;
  previewUrl: string;
}
