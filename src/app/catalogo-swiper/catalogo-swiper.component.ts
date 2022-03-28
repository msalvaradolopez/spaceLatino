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
export class CatalogoSwiperComponent implements OnInit, AfterViewInit{

  _idEmpresa: number = 0;
  _articulosList: Iarticulo[] = [];
  _articuloVenta: Iarticulo; // ARTICULO CONSULTADO

  _subSwiper: Subscription;
  _swiperShow: boolean = false;

  _swiperObj: any; 


  constructor(private _servicios: ServiciosService, private _toastr: ToastrService, private _router: Router, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  
    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));

    this._articulosList = JSON.parse(sessionStorage.getItem("articulosList"));
    this._articuloVenta = JSON.parse( sessionStorage.getItem("articuloVenta"));

    // ACTIVA ICONOS DEL MENU TOP
    this._servicios.menuTopIconos({menuFijo: true,
      btnMenu : true,
      titulo: true,
      btnBuscar: false,
      btnCerrar: false,
      btnRegresar: false,
      btnConfig: true,
      valorTitulo: ""});

      /*
    if(!this._articulosList)
      this._servicios.wsGeneral("getArticulos", { idEmpresa: this._idEmpresa, orden: 'RE', idCategoria: "0", idMarca: "0",  buscar: "" })
        .subscribe(x => {
          this._articulosList = x;
        }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Articulos")
        , () => {
          sessionStorage.setItem("articulosList", JSON.stringify(this._articulosList));
          console.log("SEGUNDO",this._articulosList);
          this.swiperShow(true, null);
        });      
*/
    /*
    this._subSwiper = this._servicios.swiper$
    .subscribe(resp => {
      this._articulosList = JSON.parse(sessionStorage.getItem("articulosList"));
      console.log("swiper", this._articulosList);
      this._articuloVenta = JSON.parse( sessionStorage.getItem("articuloVenta"));
      // window.location.reload();
      this.swiperShow(resp, this._articuloVenta);
    });
    */
  }

  
  articuloVenta(articulo: Iarticulo) {
    let articuloVenta = JSON.stringify(articulo)
    sessionStorage.setItem("articuloVenta", articuloVenta);
    sessionStorage.setItem("ventanaAnterior", "swiper");

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
  

  swiperShow(accion: boolean, articuloVenta: Iarticulo) {
    this._swiperShow = accion;
    if (accion) {

      // if(this._swiperObj)
        // this._swiperObj.destroy();
      
      // if(!this._swiperObj)
        this._swiperObj = new Swiper('.swiper', {
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
            this._swiperObj.slideTo(idx, 0, true);
          else
            this._swiperObj.slideTo(0, 0, true);
        }
    }
  }

  addFavorito(articulo: Iarticulo) {
    this._servicios.msgPopupOk("Agregado a favorito.");
  }

  ngAfterViewInit(): void {
    this.swiperShow(true, this._articuloVenta);
  }
}
