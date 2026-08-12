import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailsHeader } from './property-details-header';

describe('PropertyDetailsHeader', () => {
  let component: PropertyDetailsHeader;
  let fixture: ComponentFixture<PropertyDetailsHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDetailsHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyDetailsHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
