import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Iarticulo, Icarrito, Iimagen } from '../modelo-db';
import { DomSanitizer } from '@angular/platform-browser';
import { VentaAcciones } from '../venta-acciones';

@Component({
  selector: 'app-articulo-venta',
  templateUrl: './articulo-venta.component.html',
  styleUrls: ['./articulo-venta.component.css']
})
export class ArticuloVentaComponent implements OnInit, AfterViewInit {

  _articulo: Iarticulo;
  _carrito: Icarrito[];
  _subIconosAcciones:  Subscription;

  _botonCarritoAgregar: boolean = false;
  _botonCarritoQuitar: boolean = false;

  _ctdVenta: number = 1
  _precio: number = 0;
  _impVenta: number = 0;
  _ctdAumentaDisable: boolean = false;
  _ctdDisminuyeDisable: boolean = true;

  textoBotonCarrito: string = "";

  _nombreTipo: string = "";

  _ventanAnterior: string = "";

  constructor(private _servicios: ServiciosService, private _toastr: ToastrService, private _router: Router, private sanitizer:DomSanitizer) { }


  ngOnInit(): void {
    this._ventanAnterior = sessionStorage.getItem("ventanaAnterior");

    /// BOTENER EL CARRITO DE LA SESSION
    this._carrito = JSON.parse(sessionStorage.getItem("_carrito"));
    if (!this._carrito) 
        this._carrito = [];    

    this._articulo = JSON.parse(sessionStorage.getItem("articuloVenta"));

    if (this._articulo.tipo == "N")
    this._nombreTipo = "Nuevo";

    if (this._articulo.tipo == "U")
    this._nombreTipo = "Usado"

    if (this._articulo.tipo == "S")
    this._nombreTipo = "Saldo";

    this._precio = this._articulo.precio;

    // ACTIVA ICONOS DEL MENU TOP
    this._servicios.menuTopIconos({menuFijo: false,
      btnMenu : false,
      titulo: true,
      btnBuscar: false,
      btnCerrar: false,
      btnRegresar: true,
      btnConfig: true,
      valorTitulo: ""});

    // acciones llamadas desde el menuTop
    this._subIconosAcciones = this._servicios.iconosAcciones$
    .subscribe(resp => {
      if (resp == "regresar") 
        this._router.navigate([this._ventanAnterior]) ;
    });

    this.getCarrito();
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

  addCarrito() {    
    let addCarritoAccion = new VentaAcciones(this._articulo, this._carrito, null);

    let ctdVentaCarrito: number = this._ctdVenta;
    if (ctdVentaCarrito < 1) {
      this._toastr.error("Error : Capturar cantidades mayor a 0." , "Cantidad compra");
      return
    }

    this._carrito = addCarritoAccion.addCarrito(ctdVentaCarrito);
    this._botonCarritoQuitar = true;
    
    // ASIGNA EL NUEVO VALOR DEL CARRITO A LA SESSION
    sessionStorage.setItem("_carrito", JSON.stringify(this._carrito));

  }

  getCarrito() {
    let accionesCarrito = new VentaAcciones(this._articulo, this._carrito, null);

    let carritoDatos = accionesCarrito.getCarrito();

    if (carritoDatos) {

      this._ctdVenta = carritoDatos.cantidad;
      this.textoBotonCarrito = "Actualizar carrito";
      this._botonCarritoAgregar = true;
      this._botonCarritoQuitar = true;
      if (this._ctdVenta >= 2 && this._ctdVenta <= 9 ) {
        this._ctdAumentaDisable = false;
        this._ctdDisminuyeDisable = false;
      } else
        this._ctdDisminuyeDisable = true;
        
    } else {
      this.textoBotonCarrito = "Agregar a carrito";
      this._botonCarritoAgregar = true;
    }      

    this._impVenta = this._ctdVenta * this._precio;        
  }  

  delCarrito() {
    let accionesCarrito = new VentaAcciones(this._articulo, this._carrito, null);

    this._carrito = accionesCarrito.delCarrito();
    
    // ASIGNA EL NUEVO VALOR DEL CARRITO A LA SESSION
    sessionStorage.setItem("_carrito", JSON.stringify(this._carrito));    
    if (this._ventanAnterior == "catalogo") {
      this._servicios.swiper(true);
      this._router.navigate(["/loader"]) ;
    } else
      this._router.navigate([this._ventanAnterior]) ;
  }

  // RECIBR TRUE-INCREMENTA , FALSE-DISMINUYE
  ctdVentaBoton(accion: boolean) {
    let ctdVenta: number = this._ctdVenta;

      if (ctdVenta <= 9 && accion) { 
        ctdVenta++;
        if (ctdVenta > 9) 
          this._ctdAumentaDisable = true;
        else 
          this._ctdAumentaDisable  = false;

        this._ctdDisminuyeDisable = false;
      }
       
      if (ctdVenta >= 2 && !accion) {
        ctdVenta--;
        if (ctdVenta < 2)
          this._ctdDisminuyeDisable = true;
        else 
          this._ctdDisminuyeDisable = false;

        this._ctdAumentaDisable  = false;
      }
            
    this._ctdVenta = ctdVenta;
    this._impVenta = this._ctdVenta * this._precio;

  }

  ngOnDestroy(): void {
    this._subIconosAcciones.unsubscribe();
  }

  ngAfterViewInit(): void {
    this._servicios.swiper(false);
  }
}

