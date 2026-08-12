// Angular Imports
import { Component } from '@angular/core';
// Components
import { HeroSection } from '../../components/hero-section/hero-section';
import { FeaturedSection } from '../../components/featured-section/featured-section';

@Component({
  selector: 'app-home',
  imports: [HeroSection, FeaturedSection],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
