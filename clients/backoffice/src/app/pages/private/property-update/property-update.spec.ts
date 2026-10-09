import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUpdate } from './property-update';

describe('PropertyUpdate', () => {
  let component: PropertyUpdate;
  let fixture: ComponentFixture<PropertyUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
