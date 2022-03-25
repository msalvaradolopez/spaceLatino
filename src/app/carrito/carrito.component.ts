import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Iarticulo, Icarrito, Iimagen, Ipedido } from '../modelo-db';
import { ServiciosService } from '../servicios.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { VentaAcciones } from '../venta-acciones';

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
  _pedido: Ipedido = {idUsuario: "", telefono: "", direccion: "", notas: "", carrito: []};

  constructor(private _servicios: ServiciosService, private _toastr: ToastrService, private _router: Router, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {

    this._carritoList = JSON.parse( sessionStorage.getItem("_carrito") );
    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));

    // ACTIVA ICONOS DEL MENU TOP
    this._servicios.menuTopIconos({menu: true, titulo: true, buscar: false, cerrar: false, regresar: true, config: true, valorTitulo: "Carrito"});

    
    // acciones llamadas desde el menuTop
    this._subIconosAcciones = this._servicios.iconosAcciones$
    .subscribe(resp => {
      if (resp == "regresar" && this._ventanAnterior == "catalogo") {
        this._servicios.swiper(true);
        this._router.navigate(["/loader"]) ;
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
    let accionesCarrito = new VentaAcciones(articulo, this._carritoList, null);

    this._carritoList = accionesCarrito.delCarrito();
    this.importeTotal();
    /*
    console.log("informacion del carrito.");
    console.log(this._carrito);
    */
    // ASIGNA EL NUEVO VALOR DEL CARRITO A LA SESSION
    sessionStorage.setItem("_carrito", JSON.stringify(this._carritoList));    
  }


  importeTotal() {
    let carritoAcciones = new VentaAcciones(this._articulo, this._carritoList, null);
   
    let importeTotal = carritoAcciones.importeVenta();

    if(importeTotal)
      this._importeTotal = importeTotal;
    else 
    this._importeTotal = 0.00;
  }


  generarPedidos() {
    // validaciones
    let idUsuario: string = this._pedido.idUsuario;
    let telefono: string = this._pedido.telefono;
    let direccion: string = this._pedido.direccion;
    let notas: string = this._pedido.notas;

    if (!idUsuario) {
      this._toastr.info("Falta Usuario.");
      return;
    }
     
    if (!telefono) {
      this._toastr.info("Falta telefono cliente.");
      return;
    }

    let accionesCarrito = new VentaAcciones(this._articulo, this._carritoList, null);
    let mensajeWhatsApp = accionesCarrito.generarPedido(this._pedido);

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
