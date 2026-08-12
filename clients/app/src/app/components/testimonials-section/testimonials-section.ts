// Angular Imports
import { Component } from '@angular/core';
// Carousel
import {
  HlmCarousel,
  HlmCarouselItem,
  HlmCarouselContent,
} from '../../../../libs/ui/carousel/src/index';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [HlmCarousel, HlmCarouselContent, HlmCarouselItem],
  templateUrl: './testimonials-section.html',
  styleUrl: './testimonials-section.css',
})
export class TestimonialsSection {
  public items = Array.from({ length: 5 }, (_, i) => i + 1);
}
