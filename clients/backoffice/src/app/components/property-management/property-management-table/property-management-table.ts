// Angular Imports
import { Component, computed, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePencil, lucideTrash2 } from '@ng-icons/lucide';
// Library
import { IsPropertyUnfinishedU, PropertyI } from '@library';
// Libs
import { HlmBadgeImports, HlmButtonImports, HlmCheckboxImports, HlmTableImports } from '@libs';

@Component({
  selector: 'app-property-management-table',
  imports: [NgIcon, HlmBadgeImports, HlmButtonImports, HlmCheckboxImports, HlmTableImports],
  templateUrl: './property-management-table.html',
  styleUrl: './property-management-table.css',
  providers: [
    provideIcons({
      lucidePencil,
      lucideTrash2,
    }),
  ],
})
export class PropertyManagementTable {
  public properties = input.required<PropertyI[]>();
  public readonly selectedIds = input<string[]>([]);
  public readonly view = output<PropertyI>();
  public readonly edit = output<PropertyI>();
  public readonly delete = output<PropertyI>();
  public readonly toggle = output<ToggleI>();
  public readonly toggleAll = output<boolean>();

  protected readonly hasSelection = computed(() => this.selectedIds().length > 0);
  protected readonly allSelected = computed(() => {
    const properties = this.properties();
    const selected = new Set(this.selectedIds());
    return properties.length > 0 && properties.every((property) => selected.has(property.id));
  });
  protected readonly someSelected = computed(() => {
    const selected = new Set(this.selectedIds());
    return this.properties().some((property) => selected.has(property.id));
  });

  protected isUnfinished(property: PropertyI) {
    return IsPropertyUnfinishedU(property);
  }

  protected isSelected(propertyId: string) {
    return this.selectedIds().includes(propertyId);
  }

  protected onView(property: PropertyI) {
    this.view.emit(property);
  }

  protected onEdit(property: PropertyI) {
    this.edit.emit(property);
  }

  protected onDelete(property: PropertyI) {
    this.delete.emit(property);
  }

  protected onToggle(property: PropertyI, checked: boolean) {
    this.toggle.emit({ property, checked });
  }

  protected onToggleAll(checked: boolean) {
    this.toggleAll.emit(checked);
  }
}

interface ToggleI {
  property: PropertyI;
  checked: boolean;
}
