import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManagementListing } from './property-management-listing';

describe('PropertyManagementListing', () => {
  let component: PropertyManagementListing;
  let fixture: ComponentFixture<PropertyManagementListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyManagementListing],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyManagementListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
