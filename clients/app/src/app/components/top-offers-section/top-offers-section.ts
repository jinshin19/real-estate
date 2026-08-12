// Angular Imports
import { Component } from '@angular/core';
// Carousel
import {
  HlmCarousel,
  HlmCarouselItem,
  HlmCarouselContent,
} from '../../../../libs/ui/carousel/src/index';

@Component({
  selector: 'app-top-offers-section',
  standalone: true,
  imports: [HlmCarousel, HlmCarouselContent, HlmCarouselItem],
  templateUrl: './top-offers-section.html',
  styleUrl: './top-offers-section.css',
})
export class TopOffersSection {
  // protected readonly items = signal([]);
  public items = Array.from({ length: 5 }, (_, i) => i + 1);
}
