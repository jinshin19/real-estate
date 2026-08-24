import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManagementModal } from './property-management-modal';

describe('PropertyManagementModal', () => {
  let component: PropertyManagementModal;
  let fixture: ComponentFixture<PropertyManagementModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyManagementModal],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyManagementModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
