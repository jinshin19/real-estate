import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailsSection } from './property-details-section';

describe('PropertyDetailsSection', () => {
  let component: PropertyDetailsSection;
  let fixture: ComponentFixture<PropertyDetailsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDetailsSection],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyDetailsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
