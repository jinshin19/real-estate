import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyManagementTable } from './property-management-table';

describe('PropertyManagementTable', () => {
  let component: PropertyManagementTable;
  let fixture: ComponentFixture<PropertyManagementTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyManagementTable],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyManagementTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
