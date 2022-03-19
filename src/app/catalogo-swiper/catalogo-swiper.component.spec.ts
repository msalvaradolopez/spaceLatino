import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoSwiperComponent } from './catalogo-swiper.component';

describe('CatalogoSwiperComponent', () => {
  let component: CatalogoSwiperComponent;
  let fixture: ComponentFixture<CatalogoSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
