import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManagementHeader } from './property-management-header';

describe('PropertyManagementHeader', () => {
  let component: PropertyManagementHeader;
  let fixture: ComponentFixture<PropertyManagementHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyManagementHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyManagementHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
