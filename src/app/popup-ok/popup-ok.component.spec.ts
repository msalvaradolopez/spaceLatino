import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupOkComponent } from './popup-ok.component';

describe('PopupOkComponent', () => {
  let component: PopupOkComponent;
  let fixture: ComponentFixture<PopupOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
