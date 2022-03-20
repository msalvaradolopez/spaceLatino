import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iarticulo } from '../modelo-db';
import { Iimagen } from '../modelo-db';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare var Swiper: any;

@Component({
  selector: 'app-catalogo-swiper',
  templateUrl: './catalogo-swiper.component.html',
  styleUrls: ['./catalogo-swiper.component.css']
})
export class CatalogoSwiperComponent implements OnInit{

  _idEmpresa: number = 0;
  _articulosList: Iarticulo[] = [];
  _nomArticulo: string = "";

  _subSwiper: Subscription;
  _swiperShow: boolean = false;


  constructor(private _servicios: ServiciosService, private _toastr: ToastrService, private _router: Router, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    
    // ACTIVA ICONOS DEL MENU TOP
    //this._servicios.menuTopIconos({menu: true, titulo: true, buscar: true, cerrar: false, regresar: false, config: true, valorTitulo: ""})

    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));
    
    console.log("swiper",this._articulosList);

    this._subSwiper = this._servicios.swiper$
    .subscribe(() => {
      this._articulosList = JSON.parse(sessionStorage.getItem("articulosList"));
      this.swiperLoad();
    });
    
  }

  
  articuloVenta(articulo: Iarticulo) {
    let articuloVenta = JSON.stringify(articulo)
    sessionStorage.setItem("articuloVenta", articuloVenta);
    sessionStorage.setItem("ventanaAnterior", "catalogo");
    this._router.navigate(['/articuloventa']) ;
  }



   //Call this method in the image source, it will sanitize it.
   transform(imagenes: Iimagen[]){
    // return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
    let urlImagen: string = ""
    let imagenPrincipal: Iimagen [] = imagenes.filter(x => x.principal == "S");

    if (imagenPrincipal.length > 0 )
      urlImagen = imagenPrincipal[0].urlImagen;
      
    return urlImagen;
  }  
  
  ngOnDestroy() {
      this._subSwiper.unsubscribe();
  }

  swiperLoad() {
    this._swiperShow = true;
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'vertical',
      loop: true,
      mousewheel: true,
    
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });  
    
  }

  /*
  ngAfterViewInit(): void {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'vertical',
    loop: true,
    mousewheel: true,
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
  // this.scroll();
}

*/
/*
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
    });
    this.scroll();
  }
*/ 
}
