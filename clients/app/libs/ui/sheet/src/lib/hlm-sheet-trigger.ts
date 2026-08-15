import { Directive } from '@angular/core';
import { BrnSheetTrigger } from '@spartan-ng/brain/sheet';

@Directive({
  selector: 'button[hlmSheetTrigger]',
  standalone: true,
  hostDirectives: [{ directive: BrnSheetTrigger, inputs: ['id', 'side', 'type'] }],
  host: { 'data-slot': 'sheet-trigger' },
})
export class HlmSheetTrigger {}
