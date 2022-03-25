import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiciosService } from '../servicios.service';
import { Iempresa } from '../modelo-db';

@Component({
  selector: 'app-feed-negocio',
  templateUrl: './feed-negocio.component.html',
  styleUrls: ['./feed-negocio.component.css']
})
export class FeedNegocioComponent implements OnInit, AfterViewInit {

  _idEmpresa: number;
  _empresa: Iempresa = null;

  constructor(private _servicios: ServiciosService, private _toastr: ToastrService, private _router: Router, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {

    // ACTIVA ICONOS DEL MENU TOP
    this._servicios.menuTopIconos({menuFijo: false,
      btnMenu : true,
      titulo: true,
      btnBuscar: false,
      btnCerrar: false,
      btnRegresar: false,
      btnConfig: true,
      valorTitulo: ""});
      
    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));

    this._servicios.wsGeneral("getEmpresas", { idEmpresa: this._idEmpresa, orden: "A", buscar: "" })
      .subscribe(x => {
        this._empresa = x[0];
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Empresa"));


      

  }

  ngAfterViewInit(): void {
    this._servicios.swiper(false);
  }

}
