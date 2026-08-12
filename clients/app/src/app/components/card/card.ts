import { Component } from '@angular/core';
import { fluentLocation } from '@ng-icons/fluent-ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from 'spartan-ng/helm/button';
import { HlmCardImports } from '../../../../libs/ui/card/src';
import { HlmBadgeImports } from '../../../../libs/ui/badge/src';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [NgIcon, HlmCardImports, HlmButtonImports, HlmBadgeImports, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
  providers: [
    provideIcons({
      fluentLocation,
    }),
  ],
})
export class Card {
  protected readonly id = '123';
}
