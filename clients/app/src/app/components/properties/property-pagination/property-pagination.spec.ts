import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPagination } from './property-pagination';

describe('PropertyPagination', () => {
  let component: PropertyPagination;
  let fixture: ComponentFixture<PropertyPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyPagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
