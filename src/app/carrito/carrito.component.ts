import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Iarticulo, Icarrito, Iimagen, Ipedido } from '../modelo-db';
import { ServiciosService } from '../servicios.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { VentaAcciones } from '../venta-acciones';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit, AfterViewInit {

  _subIconosAcciones:  Subscription;

  _carritoList: Icarrito[];
  _idEmpresa: number = 0;
  _ventanAnterior: string = "";
  _importeTotal: number = 0.00;
  _articulo: Iarticulo = null;
  _pedido: Ipedido = {idPedido: 0 ,idEmpresa: 0, idUsuario: "", telefono: "", direccion: "", notas: "", carrito: []};

  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean = false;

  constructor(private _servicios: ServiciosService, 
    private _toastr: ToastrService, 
    private _router: Router, 
    private sanitizer:DomSanitizer,
    private authService: SocialAuthService) { }

  ngOnInit(): void {

    this._carritoList = JSON.parse( sessionStorage.getItem("_carrito") );
    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));

    // ACTIVA ICONOS DEL MENU TOP
    this._servicios.menuTopIconos({menuFijo: false,
      btnMenu : true,
      titulo: true,
      btnBuscar: false,
      btnCerrar: false,
      btnRegresar: false,
      btnConfig: true,
      valorTitulo: "Mi pedido"});

    
    // acciones llamadas desde el menuTop
    this._subIconosAcciones = this._servicios.iconosAcciones$
    .subscribe(resp => {
      if (resp == "regresar" && this._ventanAnterior == "catalogo") {
        this._servicios.swiper(true);
        // this._router.navigate(["/loader"]) ;
      }
        
      else
        this._router.navigate([this._ventanAnterior]) ;
    });

    if(!this._carritoList)
      this._carritoList = [];

    this.importeTotal();
  }

    
  articuloVenta(articulo: Iarticulo) {
    let articuloVenta = JSON.stringify(articulo)
    sessionStorage.setItem("articuloVenta", articuloVenta);
    sessionStorage.setItem("ventanaAnterior", "carrito");

    this._router.navigate(['/articuloventa']) ;
  }

  delCarrito(articulo: Iarticulo) {
    let accionesCarrito = new VentaAcciones(articulo, this._carritoList);

    this._carritoList = accionesCarrito.delCarrito();
    
    // ASIGNA EL NUEVO VALOR DEL CARRITO A LA SESSION
    sessionStorage.setItem("_carrito", JSON.stringify(this._carritoList));  

    this.importeTotal();
  }


  importeTotal() {
    let carritoAcciones = new VentaAcciones(this._articulo, this._carritoList);
   
    let importeTotal = carritoAcciones.importeVenta();

    if(importeTotal)
      this._importeTotal = importeTotal;
    else 
      this._importeTotal = 0.00;

    this._servicios.actPedido();  
  }


  generarPedidos() {
    // validaciones
    let idUsuario: string = "";
    let telefono: string = this._pedido.telefono;
    let direccion: string = this._pedido.direccion;
    let notas: string = this._pedido.notas;
     
    if(this._carritoList.length <= 0) {
      this._toastr.info("Eliga sus artículos antes de generar el pedido.");
      return;
    }


    if (!telefono) {
      this._toastr.info("Falta telefono cliente.");
      return;
    }

    this._pedido.carrito = this._carritoList;
    let mensaje: string = "";

    let subGoogle: Subscription;
    subGoogle = this.authService.authState.subscribe(
                  data => {
                    this.socialUser = data;
                    this.isLogged = (this.socialUser != null);
                  } 
                );

    if(this.isLogged) {

      this._pedido.idUsuario = this.socialUser.email;
      this._pedido.idEmpresa = this._idEmpresa;
      this._servicios.wsGeneral("insPedido", this._pedido)
      .subscribe(x => {
        mensaje = x;
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Generar pedido")
      , () => {
        this._toastr.success( mensaje, "Generar pedido")
        this._carritoList = [];
        this._pedido = null;
        sessionStorage.setItem("_carrito", JSON.stringify(this._carritoList));
        this._servicios.actPedido();  
        this._router.navigate(["/swiper"]) ;
      });
    } else
      this._servicios.login(true);

    subGoogle.unsubscribe();

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

  ngAfterViewInit(): void {
    this._servicios.swiper(false);
  }

}
