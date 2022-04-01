import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.css']
})
export class MenuHeaderComponent implements OnInit, OnDestroy {

  @ViewChild('inputBuscar') searchElement: ElementRef;

    // PARA MOSTRAR y/o OCULTAR ICONOS DEL MENU TOP
    _menuTopiconos: any = {
      menuFijo: true,
      btnMenu : true,
      titulo: true,
      btnBuscar: true,
      btnCerrar: false,
      btnRegresar: false,
      btnConfig: true,
      valorTitulo: ""
  }

  _inputBuscar: boolean = false;
  _spanEspacio: boolean = false;
  _valorTitulo: string;

  _dosColumnas: boolean = true;
  _subscription: Subscription;

  constructor(private _servicios: ServiciosService, private _router: Router) { }

  ngOnInit(): void {
    this._menuTopiconos.valorTitulo = sessionStorage.getItem("nomEmpresa");
    this._valorTitulo = this._menuTopiconos.valorTitulo;

    this._subscription = this._servicios.menuTopIconos$
      .subscribe(resp => {
        this._menuTopiconos = resp;
        if (this._menuTopiconos.valorTitulo == "")
          this._menuTopiconos.valorTitulo = sessionStorage.getItem("nomEmpresa");

        this._valorTitulo = this._menuTopiconos.valorTitulo;
        this._inputBuscar = false;
      });
  }


  accionLupa() {
    this._menuTopiconos.btnBuscar = false;
    this._menuTopiconos.menuFijo = false;
    this._menuTopiconos.btnCerrar = true;
    this._menuTopiconos.titulo = false;
    this._inputBuscar = true;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.searchElement.nativeElement.focus();
    },0); 
    this._router.navigate(["/buscar"]) ; 
  }

  accionCerrar() {
    this._menuTopiconos.btnBuscar = true;
    this._menuTopiconos.btnCerrar = false;
    this._menuTopiconos.titulo = true;
    this._inputBuscar = false;

      this._router.navigate(["/loader"]) ;
    
  }

  // CAMBIAR DE DOS A TRES COLUMNAS O DE TRES COLUMNAS A DOS PARA MOSTRAR EL LISTADO DE ARTICULOS.
  accionColumnas() {
    this._dosColumnas = this._dosColumnas ? false : true;
    this._servicios.dosColumnas(this._dosColumnas );
  }

  accionRegresar() {
    this._servicios.iconosAcciones("regresar");
  }

  // enviar whatsapp
  mensajeWhatsApp() {
    this._servicios.wsWhatsApp("");
  }

  onKeypressEvent(event: any){
    if (event.target.value.length > 2)
      this._servicios.buscar(event.target.value);
    else 
      this._servicios.buscar("");
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
