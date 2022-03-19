import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHeaderSwiperComponent } from './menu-header-swiper.component';

describe('MenuHeaderSwiperComponent', () => {
  let component: MenuHeaderSwiperComponent;
  let fixture: ComponentFixture<MenuHeaderSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuHeaderSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHeaderSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
