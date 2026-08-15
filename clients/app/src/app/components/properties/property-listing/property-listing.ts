// Angular Imports
import { Component } from '@angular/core';
import { HlmCarouselImports } from 'spartan-ng/helm/carousel';
import { Card } from '../../card/card';

@Component({
  selector: 'app-property-listing',
  imports: [HlmCarouselImports, Card],
  templateUrl: './property-listing.html',
  styleUrl: './property-listing.css',
})
export class PropertyListing {
  public items = Array.from({ length: 25 }, (_, i) => i + 1);
}
