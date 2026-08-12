// Angular Imports
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
// Constants
import { lucideGithub, lucideLinkedin } from '@ng-icons/lucide';
import { fluentBuildingTownhouse, fluentGlobe } from '@ng-icons/fluent-ui';
import { FooterLinksC } from '@library/constants';

@Component({
  selector: 'app-footer',
  imports: [NgIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  providers: [
    provideIcons({
      fluentGlobe,
      lucideGithub,
      lucideLinkedin,
      fluentBuildingTownhouse,
    }),
  ],
})
export class Footer {
  protected readonly footerLinks = FooterLinksC;
}
