import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiciosService } from '../servicios.service';
import { Iempresa, Iarticulo, Icatalogo, Imarca} from '../modelo-db';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit, OnDestroy {

  _urlIMG: string = environment.urlIMG;

  _idEmpresa: number;
  _articulosList: Iarticulo[] = [];
  _subBuscar: Subscription;

  constructor(private _servicios: ServiciosService, 
    private _toastr: ToastrService, 
    private _router: Router, 
    private sanitizer:DomSanitizer) { }

  ngOnInit(): void {

    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));
    this._articulosList = JSON.parse(sessionStorage.getItem("articulosList"));

    this._subBuscar = this._servicios.buscar$
    .subscribe(resp => {
      this.getArticulos(resp);
    });

  }

  getArticulos(buscar: string) {
    
    this._servicios.wsGeneral("getArticulos", { idEmpresa: this._idEmpresa, orden: 'RE', idCategoria: "0", idMarca: "0",  buscar: buscar })
      .subscribe(x => {
        this._articulosList = x;
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Artículos")
      , () => {
        sessionStorage.setItem("articulosList", JSON.stringify(this._articulosList));
      });
  }

  swiper(itemArticulo: Iarticulo){
    sessionStorage.setItem("articuloVenta", JSON.stringify(itemArticulo));

    // ACTIVA ICONOS DEL MENU TOP
    this._servicios.menuTopIconos({menuFijo: true,
      btnMenu : true,
      titulo: true,
      btnBuscar: true,
      btnCerrar: false,
      btnRegresar: false,
      btnConfig: true,
      valorTitulo: ""});

    this._router.navigate(["/swiper"]) ;
  }

  ngOnDestroy(): void {
    this._subBuscar.unsubscribe();
  }

}
