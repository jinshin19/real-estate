// Angular Imports
import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
// Components
import { PropertyDetailsHeader } from '../../components/property-details/property-details-header/property-details-header';
import { PropertyDetailsSection } from '../../components/property-details/property-details-section/property-details-section';

@Component({
  selector: 'app-property-details',
  imports: [PropertyDetailsHeader, PropertyDetailsSection],
  templateUrl: './property-details.html',
  styleUrl: './property-details.css',
})
export class PropertyDetails {
  private readonly route = inject(ActivatedRoute);

  public ngOnInit() {
    const propertyId = this.route.snapshot.paramMap.get('propertyId');
  }
}
