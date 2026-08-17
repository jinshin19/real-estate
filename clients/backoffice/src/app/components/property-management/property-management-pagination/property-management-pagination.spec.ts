import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManagementPagination } from './property-management-pagination';

describe('PropertyManagementPagination', () => {
  let component: PropertyManagementPagination;
  let fixture: ComponentFixture<PropertyManagementPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyManagementPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyManagementPagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
