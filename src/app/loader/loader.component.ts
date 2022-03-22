import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiciosService } from '../servicios.service';
import { Iarticulo } from '../modelo-db';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  _idEmpresa: number = 0;
  _articulosList: Iarticulo[] = [];
  _nomArticulo: string = "";


  constructor(private _servicios: ServiciosService, private _toastr: ToastrService, private _router: Router, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    sessionStorage.setItem("nomEmpresa", "Space-Latino")


    sessionStorage.setItem("idEmpresa", "1");


    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));
    this._servicios.wsGeneral("getArticulos", { idEmpresa: this._idEmpresa, nomArticulo: this._nomArticulo })
      .subscribe(x => {
        this._articulosList = x;
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Sucursal")
      , () => {
        sessionStorage.setItem("articulosList", JSON.stringify(this._articulosList));
        this._servicios.swiper(true);
      });

      
  }

}
