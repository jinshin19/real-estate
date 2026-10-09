// Angular Imports
import { toast } from '@spartan-ng/brain/sonner';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentLocation } from '@ng-icons/fluent-ui';
import { lucideArrowLeft, lucidePencil } from '@ng-icons/lucide';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Library
import { GetPropertyImagesU, IsPropertyUnfinishedU, PropertyI, PropertyService } from '@library';
// Components
import { Header } from '@components/header/header';
import { PropertyManagementGallery } from '@components/property-management/property-management-gallery/property-management-gallery';
// Libs
import { HlmBadgeImports, HlmButtonImports } from '@libs';

@Component({
  selector: 'app-property-view',
  imports: [NgIcon, Header, HlmBadgeImports, HlmButtonImports, PropertyManagementGallery],
  templateUrl: './property-view.html',
  styleUrl: './property-view.css',
  providers: [
    provideIcons({
      lucidePencil,
      lucideArrowLeft,
      fluentLocation,
    }),
  ],
})
export class PropertyView {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly propertyService = inject(PropertyService);

  protected readonly property = signal<PropertyI | null>(null);
  protected readonly images = signal<string[]>([]);

  constructor() {
    const propertyId = this.route.snapshot.paramMap.get('propertyId');

    if (!propertyId) {
      this.router.navigate(['/property-management']);
      return;
    }

    this.propertyService.onGetById(propertyId).subscribe({
      next: (response) => {
        if (!response.success || !response.data) {
          toast.error(response.message || 'Property not found');
          this.router.navigate(['/property-management']);
          return;
        }

        this.property.set(response.data);
        this.images.set(GetPropertyImagesU(response.data).map((image) => image.url));
      },
      error: (error) => {
        toast.error(error?.error?.message || error?.statusText || error?.message);
        this.router.navigate(['/property-management']);
      },
    });
  }

  protected isUnfinished(property: PropertyI) {
    return IsPropertyUnfinishedU(property);
  }

  protected onBack() {
    this.router.navigate(['/property-management']);
  }

  protected onEdit() {
    const property = this.property();
    if (!property?.id) return;
    this.router.navigate(['/property', property.id, 'update']);
  }
}
