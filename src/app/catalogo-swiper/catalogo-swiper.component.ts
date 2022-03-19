import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var Swiper: any;

@Component({
  selector: 'app-catalogo-swiper',
  templateUrl: './catalogo-swiper.component.html',
  styleUrls: ['./catalogo-swiper.component.css']
})
export class CatalogoSwiperComponent implements OnInit, AfterViewInit{

  _catalogoList: any[] = [1,2,3];
 
  constructor(private _router: Router) {}

  ngOnInit(): void {
    console.log(this._catalogoList);

  }

  ngAfterViewInit(): void {
    var swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      sliderPerView: 1,
      spaceBetween: 0,
      mousewheel: true,
      pagination: {
          el:'.swiper-pagination',
          type: 'progressbar',
      }
  }) 
  }

}
