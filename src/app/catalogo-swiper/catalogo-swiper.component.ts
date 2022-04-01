import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iarticulo, Ifavorito } from '../modelo-db';
import { Iimagen } from '../modelo-db';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
declare var Swiper: any;
declare var $: any;
declare var navigator:any;

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


  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean = false;

  _favoritos: Ifavorito[] = [];


  constructor(private _servicios: ServiciosService, 
    private _toastr: ToastrService, 
    private _router: Router, 
    private sanitizer:DomSanitizer, 
    private authService: SocialAuthService) { }

  ngOnInit(): void {

    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));

    this._articulosList = JSON.parse(sessionStorage.getItem("articulosList"));
    this._articuloVenta = JSON.parse( sessionStorage.getItem("articuloVenta"));
    this._favoritos = JSON.parse(sessionStorage.getItem("favoritos"));

    if (!this._favoritos)
      this._favoritos = [];

    // ACTIVA ICONOS DEL MENU TOP
    this._servicios.menuTopIconos({menuFijo: true,
      btnMenu : true,
      titulo: true,
      btnBuscar: true,
      btnCerrar: false,
      btnRegresar: false,
      btnConfig: true,
      valorTitulo: ""});


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

    let subGoogle: Subscription;
    subGoogle = this.authService.authState.subscribe(
                  data => {
                    this.socialUser = data;
                    this.isLogged = (this.socialUser != null);
                  } 
                );
    
    if(this.isLogged) {
      if(this.getFavorito(articulo)) 
        this._favoritos = this._favoritos.filter(x => x.articulo.idArticulo != articulo.idArticulo);
      else 
        this._favoritos.push({articulo: articulo});

      sessionStorage.setItem("favoritos", JSON.stringify(this._favoritos));
      this._servicios.actFavorito();
      this._servicios.msgPopupOk("Favorito actualizado.");
    }
      
    else 
      this._servicios.login(true);

    subGoogle.unsubscribe();
  }

  getFavorito(articulo: Iarticulo): boolean {
    return (this._favoritos.filter(x => x.articulo.idArticulo == articulo.idArticulo).length > 0);
  }

  botonCompartir(){
    const url = window.document.location.href;

    navigator.share({
      title: "prueba",
      text: 'texto de prueba',
      url: url,
    }); // share the URL of MDN
  }

  ngAfterViewInit(): void {
    this.swiperShow(true, this._articuloVenta);
  }
}
