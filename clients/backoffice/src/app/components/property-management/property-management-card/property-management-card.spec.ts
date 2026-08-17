import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManagementCard } from './property-management-card';

describe('PropertyManagementCard', () => {
  let component: PropertyManagementCard;
  let fixture: ComponentFixture<PropertyManagementCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyManagementCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyManagementCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
