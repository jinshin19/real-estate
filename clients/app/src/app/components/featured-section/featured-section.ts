// Angular Imports
import { Component } from '@angular/core';
// Carousel
import {
  HlmCarousel,
  HlmCarouselItem,
  HlmCarouselContent,
} from '../../../../libs/ui/carousel/src/index';
import { Card } from '../card/card';

@Component({
  selector: 'app-featured-section',
  imports: [HlmCarousel, HlmCarouselContent, HlmCarouselItem, Card],
  templateUrl: './featured-section.html',
  styleUrl: './featured-section.css',
})
export class FeaturedSection {
  public items = Array.from({ length: 5 }, (_, i) => i + 1);
}
