import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManagementFilters } from './property-management-filters';

describe('PropertyManagementFilters', () => {
  let component: PropertyManagementFilters;
  let fixture: ComponentFixture<PropertyManagementFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyManagementFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyManagementFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
