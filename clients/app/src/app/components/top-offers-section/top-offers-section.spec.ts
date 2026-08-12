import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopOffersSection } from './top-offers-section';

describe('TopOffersSection', () => {
  let component: TopOffersSection;
  let fixture: ComponentFixture<TopOffersSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopOffersSection],
    }).compileComponents();

    fixture = TestBed.createComponent(TopOffersSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
