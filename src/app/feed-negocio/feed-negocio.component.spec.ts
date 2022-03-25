import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedNegocioComponent } from './feed-negocio.component';

describe('FeedNegocioComponent', () => {
  let component: FeedNegocioComponent;
  let fixture: ComponentFixture<FeedNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
