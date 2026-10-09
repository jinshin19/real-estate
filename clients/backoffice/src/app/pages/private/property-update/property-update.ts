// Angular Imports
import { toast } from '@spartan-ng/brain/sonner';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmInputImports } from 'spartan-ng/helm/input';
import { ActivatedRoute, Router } from '@angular/router';
import { BrnDialogState } from '@spartan-ng/brain/dialog';
import { lucideArrowLeft, lucidePlus } from '@ng-icons/lucide';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, computed, inject, signal } from '@angular/core';
// Library
import {
  PropertyService,
  ValidateImagesU,
  GetPropertyImagesU,
  UploadedPropertyImageI,
} from '@library';
// Forms
import { UpdatePropertyForm } from './property-update.form';
// Libs
import { HlmButtonImports, HlmDialogImports, HlmFieldImports } from '@libs';
// Components
import { Header } from '@components/header/header';
import { PropertyManagementGallery } from '@components/property-management/property-management-gallery/property-management-gallery';

@Component({
  selector: 'app-property-update',
  imports: [
    NgIcon,
    Header,
    HlmFieldImports,
    HlmInputImports,
    HlmButtonImports,
    HlmDialogImports,
    ReactiveFormsModule,
    PropertyManagementGallery,
  ],
  templateUrl: './property-update.html',
  styleUrl: './property-update.css',
  providers: [
    provideIcons({
      lucidePlus,
      lucideArrowLeft,
    }),
  ],
})
export class PropertyUpdate {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly propertyService = inject(PropertyService);

  readonly MAX_IMAGES = 10;

  protected readonly form = UpdatePropertyForm();
  protected readonly images = signal<ImageI[]>([]);
  protected readonly isSaving = signal(false);
  protected readonly formDirty = signal(false);
  protected readonly saveDialogState = signal<BrnDialogState>('closed');
  protected readonly propertyId = this.route.snapshot.paramMap.get('propertyId');

  private readonly initialImageIds = signal<string[]>([]);
  protected readonly imagesDirty = computed(() => {
    const current = this.images().map((image) => image.id);
    const initial = this.initialImageIds();
    return current.length !== initial.length || current.some((id, index) => id !== initial[index]);
  });
  protected readonly showSave = computed(() => this.formDirty() || this.imagesDirty());

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.formDirty.set(this.form.dirty);
    });

    if (!this.propertyId) {
      this.router.navigate(['/property-management']);
      return;
    }

    this.propertyService.onGetById(this.propertyId).subscribe({
      next: (response) => {
        if (!response.success || !response.data) {
          toast.error(response.message || 'Property not found');
          this.router.navigate(['/property-management']);
          return;
        }

        const property = response.data;
        this.form.patchValue({
          title: property.title ?? '',
          type: property.type ?? '',
          bedrooms: property.specifications?.bedrooms ?? null,
          address: property.location?.street ?? '',
          city: property.location?.city ?? '',
          province: property.location?.province ?? '',
          postal: property.location?.zipCode ?? '',
          price: property.price ?? null,
          description: property.description ?? '',
        });
        this.form.markAsPristine();
        this.formDirty.set(false);
        this.images.set(
          GetPropertyImagesU(property).map((image) => ({
            id: image.id,
            previewUrl: image.url,
            uploaded: image,
          })),
        );
        this.initialImageIds.set(this.images().map((image) => image.id));
      },
      error: (error) => {
        toast.error(error?.error?.message || error?.statusText || error?.message);
        this.router.navigate(['/property-management']);
      },
    });
  }

  protected previewUrls() {
    return this.images().map((image) => image.previewUrl);
  }

  protected onBack() {
    this.router.navigate(['/property-management']);
  }

  protected onImageSelect(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (!files?.length) return;

    const remaining = this.MAX_IMAGES - this.images().length;
    if (remaining <= 0) {
      inputElement.value = '';
      return;
    }

    const selectedFiles = Array.from(files).slice(0, remaining);
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach((file) => dataTransfer.items.add(file));

    if (
      !ValidateImagesU({
        files: dataTransfer.files,
        types: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
      })
    ) {
      inputElement.value = '';
      return;
    }

    this.images.update((images) => [
      ...images,
      ...selectedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
    inputElement.value = '';
  }

  protected onRemoveImage(index: number) {
    const image = this.images()[index];
    if (image?.file && image.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(image.previewUrl);
    }
    this.images.update((images) => images.filter((_, i) => i !== index));
  }

  protected onSave() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }

    this.saveDialogState.set('open');
  }

  protected onConfirmSave() {
    if (this.form.invalid || this.isSaving()) {
      this.form.markAsTouched();
      return;
    }

    const propertyId = this.propertyId;
    if (!propertyId) return;

    const value = this.form.getRawValue();
    const remainingUploaded = this.images()
      .filter((image) => image.uploaded)
      .map((image) => image.uploaded as UploadedPropertyImageI);
    const newFiles = this.images()
      .filter((image) => image.file)
      .map((image) => image.file as File);

    this.isSaving.set(true);

    const save = (uploaded: UploadedPropertyImageI[]) => {
      this.propertyService
        .onUpdate({
          propertyId,
          payload: {
            title: value.title,
            ...(value.description ? { description: value.description } : {}),
            ...(value.price != null ? { price: Number(value.price) } : {}),
            location: {
              street: value.address || '',
              city: value.city || '',
              province: value.province || '',
              zipCode: value.postal || '',
            },
            images: uploaded,
          },
        })
        .subscribe({
          next: (response) => {
            this.isSaving.set(false);
            if (!response.success) {
              toast.error(response.message || 'Failed to update property');
              return;
            }
            this.saveDialogState.set('closed');
            this.propertyService.onList({ page: this.propertyService.propertyCurrentPage() });
            this.router.navigate(['/property', propertyId, 'view']);
          },
          error: (error) => {
            this.isSaving.set(false);
            toast.error(error?.error?.message || error?.statusText || error?.message);
          },
        });
    };

    if (!newFiles.length) {
      save(remainingUploaded);
      return;
    }

    this.propertyService.onUpload(newFiles).subscribe({
      next: (response) => {
        if (!response.success || !response.data?.length) {
          this.isSaving.set(false);
          toast.error(response.message || 'Failed to upload');
          return;
        }
        save([...remainingUploaded, ...response.data]);
      },
      error: (error) => {
        this.isSaving.set(false);
        toast.error(error?.error?.message || error?.statusText || error?.message);
      },
    });
  }
}

interface ImageI {
  id: string;
  previewUrl: string;
  file?: File;
  uploaded?: UploadedPropertyImageI;
}
