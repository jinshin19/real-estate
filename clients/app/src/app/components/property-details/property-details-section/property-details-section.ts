// Angular Imports
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { fluentCall, fluentLocation, fluentMail } from '@ng-icons/fluent-ui';
import { HlmButtonImports } from 'spartan-ng/helm/button';
import { HlmSeparatorImports } from 'spartan-ng/helm/separator';
import { HlmCardImports } from '../../../../../libs/ui/card/src';
import { HlmBadgeImports } from '../../../../../libs/ui/badge/src';

@Component({
  selector: 'app-property-details-section',
  imports: [HlmCardImports, HlmBadgeImports, NgIcon, HlmSeparatorImports, HlmButtonImports],
  templateUrl: './property-details-section.html',
  styleUrl: './property-details-section.css',
  providers: [
    provideIcons({
      fluentLocation,
      fluentCall,
      fluentMail,
    }),
  ],
})
export class PropertyDetailsSection {}
