import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloVentaComponent } from './articulo-venta.component';

describe('ArticuloVentaComponent', () => {
  let component: ArticuloVentaComponent;
  let fixture: ComponentFixture<ArticuloVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
