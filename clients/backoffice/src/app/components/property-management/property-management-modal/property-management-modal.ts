// Angular Imports
import { toast } from '@spartan-ng/brain/sonner';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmInputImports } from 'spartan-ng/helm/input';
import { BrnDialogState } from '@spartan-ng/brain/dialog';
import { Component, inject, model, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { lucideArrowRight } from '@ng-icons/lucide';
// Library
import { PropertyService } from '@library';
// Forms
import { CreatePropertyForm } from './property-management-modal.form';
// Libs
import { HlmFieldImports, HlmButtonImports, HlmDialogImports } from '@libs';

@Component({
  selector: 'app-property-management-modal',
  imports: [
    NgIcon,
    HlmFieldImports,
    HlmInputImports,
    HlmDialogImports,
    HlmButtonImports,
    ReactiveFormsModule,
  ],
  templateUrl: './property-management-modal.html',
  styleUrl: './property-management-modal.css',
  providers: [
    provideIcons({
      lucideArrowRight,
    }),
  ],
})
export class PropertyManagementModal {
  private readonly router = inject(Router);
  private readonly propertyService = inject(PropertyService);
  public createPropertyModalState = model<BrnDialogState | null>(null);

  protected readonly createPropertyForm = CreatePropertyForm();
  protected readonly isCreating = signal(false);

  protected onCreate() {
    if (this.createPropertyForm.invalid) {
      this.createPropertyForm.markAsTouched();
      return;
    }

    const payload = this.createPropertyForm.getRawValue();
    this.isCreating.set(true);

    this.propertyService.onCreate({ ...payload }).subscribe({
      next: (response) => {
        this.isCreating.set(false);

        if (!response.success || !response.data?.id) {
          toast.error(response.message || 'Failed to create property');
          return;
        }

        this.createPropertyModalState.set('closed');
        this.createPropertyForm.reset();
        this.propertyService.onList({
          page: this.propertyService.propertyCurrentPage(),
        });
        this.router.navigate(['/property', response.data.id, 'update']);
      },
      error: (error) => {
        this.isCreating.set(false);
        toast.error(error?.error?.message || error?.statusText || error?.message);
      },
    });
  }
}
