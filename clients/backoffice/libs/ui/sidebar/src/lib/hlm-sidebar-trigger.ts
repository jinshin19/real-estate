// Angular Imports
import { lucidePanelLeft } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  fluentArrowLeft,
  fluentArrowRight,
  fluentIosArrowRtl,
  fluentIosArrowLtr,
} from '@ng-icons/fluent-ui';
import { HlmButton, provideBrnButtonConfig } from 'spartan-ng/helm/button';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
//
import { HlmSidebarService } from './hlm-sidebar.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[hlmSidebarTrigger]',
  imports: [NgIcon],
  providers: [
    provideIcons({
      lucidePanelLeft,
      fluentArrowLeft,
      fluentArrowRight,
      fluentIosArrowRtl,
      fluentIosArrowLtr,
    }),
    provideBrnButtonConfig({ variant: 'ghost', size: 'icon-sm' }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
  host: {
    'data-slot': 'sidebar-trigger',
    'data-sidebar': 'trigger',
    '(click)': '_onClick()',
  },
  template: `
    <button class="bg-muted h-7 w-7 flex items-center justify-center rounded-full cursor-pointer">
      <ng-icon [name]="_customIcon()" size="14" />
    </button>
    <span class="sr-only">{{ srOnlyText() }}</span>
  `,
})
export class HlmSidebarTrigger {
  private readonly _sidebarService = inject(HlmSidebarService);

  public readonly srOnlyText = input<string>('Toggle Sidebar');

  // Custom
  public readonly _customIcon = signal<string>(
    this._sidebarService.state() === 'expanded' ? 'fluentArrowLeft ' : 'fluentArrowRight ',
  );

  protected _onClick(): void {
    const state = this._sidebarService.state();
    this._customIcon.update(() =>
      state === 'expanded' ? 'fluentArrowRight ' : 'fluentArrowLeft ',
    );
    this._sidebarService.toggleSidebar();
  }
}
