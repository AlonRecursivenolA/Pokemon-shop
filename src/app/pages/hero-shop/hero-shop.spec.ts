import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroShop } from './hero-shop';

describe('HeroShop', () => {
  let component: HeroShop;
  let fixture: ComponentFixture<HeroShop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroShop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroShop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
