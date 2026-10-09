// Angular Imports
import { Router } from '@angular/router';
import { toast } from '@spartan-ng/brain/sonner';
import { BrnDialogState } from '@spartan-ng/brain/dialog';
import { Component, computed, inject, signal } from '@angular/core';
// Library
import { ListingFilterI, PropertyI, PropertyService } from '@library';
// Components
import { PropertyManagementModal } from '@components/property-management/property-management-modal/property-management-modal';
import { PropertyManagementHeader } from '@components/property-management/property-management-header/property-management-header';
import { PropertyManagementListing } from '@components/property-management/property-management-listing/property-management-listing';
import { PropertyManagementFilters } from '@components/property-management/property-management-filters/property-management-filters';
import { PropertyManagementPagination } from '@components/property-management/property-management-pagination/property-management-pagination';
// Libs
import { HlmButtonImports, HlmDialogImports } from '@libs';

@Component({
  selector: 'app-property-management',
  imports: [
    HlmDialogImports,
    HlmButtonImports,
    PropertyManagementModal,
    PropertyManagementHeader,
    PropertyManagementListing,
    PropertyManagementFilters,
    PropertyManagementPagination,
  ],
  styleUrl: './property-management.css',
  templateUrl: './property-management.html',
})
export class PropertyManagement {
  private readonly router = inject(Router);
  private readonly propertyService = inject(PropertyService);

  protected mode = signal<ListingFilterI>({
    module: 'property-management',
    mode: 'list',
  });

  protected readonly selected = signal<PropertyI[]>([]);
  protected readonly selectedIds = computed(() => this.selected().map((property) => property.id));
  protected readonly pendingDelete = signal<PropertyI[]>([]);
  protected readonly isDeleting = signal(false);
  protected readonly deleteDialogState = signal<BrnDialogState>('closed');
  protected readonly deleteTitle = computed(() =>
    this.pendingDelete().length > 1 ? 'Delete properties?' : 'Delete property?',
  );
  protected readonly deleteDescription = computed(() =>
    this.pendingDelete().length > 1
      ? 'Are you sure you want to delete these properties? This cannot be undone.'
      : 'Are you sure you want to delete this property? This cannot be undone.',
  );

  protected createPropertyModalState = signal<BrnDialogState>('closed');

  protected onModeChange(mode: ListingFilterI) {
    this.mode.update((prev) => ({ ...prev, ...mode }));
  }

  protected onCreatePropertyModal = (state: string) => {
    this.createPropertyModalState.set(state as BrnDialogState);
  };

  protected onView(property: PropertyI) {
    this.router.navigate(['/property', property.id, 'view']);
  }

  protected onEdit(property: PropertyI) {
    this.router.navigate(['/property', property.id, 'update']);
  }

  protected onToggle(event: { property: PropertyI; checked: boolean }) {
    this.selected.update((list) => {
      if (event.checked) {
        return list.some((property) => property.id === event.property.id)
          ? list
          : [...list, event.property];
      }

      return list.filter((property) => property.id !== event.property.id);
    });
  }

  protected onToggleAll(checked: boolean) {
    const page = this.propertyService.properties();

    this.selected.update((list) => {
      if (checked) {
        const existing = new Set(list.map((property) => property.id));
        return [...list, ...page.filter((property) => !existing.has(property.id))];
      }

      const remove = new Set(page.map((property) => property.id));
      return list.filter((property) => !remove.has(property.id));
    });
  }

  protected onDelete(property: PropertyI) {
    this.openDeleteDialog([property]);
  }

  protected onDeleteSelected() {
    if (!this.selected().length) return;
    this.openDeleteDialog(this.selected());
  }

  protected onConfirmDelete() {
    const properties = this.pendingDelete();
    if (!properties.length || this.isDeleting()) return;

    this.isDeleting.set(true);
    this.propertyService.onDelete(properties.map((property) => property.id)).subscribe({
      next: (response) => {
        this.isDeleting.set(false);
        if (!response.success) {
          toast.error(response.message || 'Failed to delete');
          return;
        }

        toast.success(response.message || 'Deleted');
        this.closeDeleteDialog();
        this.selected.set([]);
        this.propertyService.onList({ page: this.propertyService.propertyCurrentPage() });
      },
      error: (error) => {
        this.isDeleting.set(false);
        toast.error(error?.error?.message || error?.statusText || error?.message);
      },
    });
  }

  private openDeleteDialog(properties: PropertyI[]) {
    this.pendingDelete.set(properties);
    this.deleteDialogState.set('open');
  }

  private closeDeleteDialog() {
    this.deleteDialogState.set('closed');
    this.pendingDelete.set([]);
  }
}
