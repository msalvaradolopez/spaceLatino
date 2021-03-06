import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiciosService } from '../servicios.service';
import { Iarticulo, Iempresa } from '../modelo-db';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  _idEmpresa: number = 0;
  _empresa: Iempresa;
  _articulosList: Iarticulo[] = [];
  _nomArticulo: string = "";

  constructor(private _servicios: ServiciosService, private _toastr: ToastrService, private _router: Router, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    
    sessionStorage.setItem("nomEmpresa", "Space-Latino")
    sessionStorage.setItem("idEmpresa", "1");

    // ACTIVA ICONOS DEL MENU TOP
    this._servicios.menuTopIconos({menuFijo: true,
      btnMenu : true,
      titulo: true,
      btnBuscar: true,
      btnCerrar: false,
      btnRegresar: false,
      btnConfig: true,
      valorTitulo: ""});
      

    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));

    this._servicios.wsGeneral("getArticulos", { idEmpresa: this._idEmpresa, orden: 'RE', idCategoria: "0", idMarca: "0",  buscar: "" })
      .subscribe(x => {
        this._articulosList = x;
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Sucursal")
      , () => {
        sessionStorage.setItem("articulosList", JSON.stringify(this._articulosList));
        this._router.navigate(["/swiper"]) ;
      });    
      
    this._servicios.wsGeneral("getEmpresas", { idEmpresa: this._idEmpresa, orden: "A", buscar: "" })
      .subscribe(x => {
        this._empresa = x[0];
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Empresa")
      , () => sessionStorage.setItem("empresa", JSON.stringify(this._empresa))
      );
      
  }
}
