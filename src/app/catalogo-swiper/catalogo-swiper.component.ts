import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iarticulo } from '../modelo-db';
import { Iimagen } from '../modelo-db';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare var Swiper: any;
declare var $: any;

@Component({
  selector: 'app-catalogo-swiper',
  templateUrl: './catalogo-swiper.component.html',
  styleUrls: ['./catalogo-swiper.component.css']
})
export class CatalogoSwiperComponent implements OnInit{

  _idEmpresa: number = 0;
  _articulosList: Iarticulo[] = [];
  _articuloVenta: Iarticulo; // ARTICULO CONSULTADO

  _subSwiper: Subscription;
  _swiperShow: boolean = false;


  constructor(private _servicios: ServiciosService, private _toastr: ToastrService, private _router: Router, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  
    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));

    this._subSwiper = this._servicios.swiper$
    .subscribe(resp => {
      this._articulosList = JSON.parse(sessionStorage.getItem("articulosList"));
      this._articuloVenta = JSON.parse( sessionStorage.getItem("articuloVenta"));
      this.swiperShow(resp, this._articuloVenta);
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

  swiperShow(accion: boolean, articuloVenta: Iarticulo) {
    this._swiperShow = accion;
    if (accion) {
      const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'vertical',
        loop: false,
        mousewheel: true,
      
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        grabCursor: true
      });  
  
      if(articuloVenta) {
        let idx = this._articulosList.map(ren => ren.idArticulo).indexOf(articuloVenta.idArticulo);
        if (idx) 
          swiper.activeIndex = idx;
      }
    }
    
  }
}
