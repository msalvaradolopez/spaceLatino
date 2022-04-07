import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Iempresa, Iarticulo, Icatalogo, Imarca} from '../modelo-db';

@Component({
  selector: 'app-menu-aux',
  templateUrl: './menu-aux.component.html',
  styleUrls: ['./menu-aux.component.css']
})
export class MenuAuxComponent implements OnInit {

  _idEmpresa: number = 0;
  _articulosList: Iarticulo[] = [];

  constructor(private _toastr: ToastrService, private _router: Router, private _servicios: ServiciosService) { }

  ngOnInit(): void {

    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));

  }

  getArticulos(orden: string) {    
   
    sessionStorage.setItem("idCategoria", "0");
    sessionStorage.setItem("idMarca", "0");
    sessionStorage.removeItem("articuloVenta");
    
    this._servicios.wsGeneral("getArticulos", { idEmpresa: this._idEmpresa, orden: orden, idCategoria: "0", idMarca: "0",  buscar: "" })
      .subscribe(x => {
        this._articulosList = x;
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Artículos")
      , () => {
        sessionStorage.setItem("articulosList", JSON.stringify(this._articulosList));
        let ventanaAnterior:string = sessionStorage.getItem("ventanaAnterior");
        this._router.navigate([ventanaAnterior]) ;
      });
  }

  accionCerrar() {
    let ventanaAnterior:string = sessionStorage.getItem("ventanaAnterior");
    console.log("VENTANA:", ventanaAnterior);
    this._router.navigate([ventanaAnterior]) ;
  }

}
