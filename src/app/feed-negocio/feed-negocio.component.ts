import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ServiciosService } from '../servicios.service';
import { Iempresa, Iarticulo, Icatalogo, Imarca} from '../modelo-db';
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-feed-negocio',
  templateUrl: './feed-negocio.component.html',
  styleUrls: ['./feed-negocio.component.css']
})
export class FeedNegocioComponent implements OnInit {


  _urlIMG: string = environment.urlIMG;

  _idEmpresa: number;
  _empresa: Iempresa = null;
  _articulosList: Iarticulo[] = [];
  _catalogosList: Icatalogo[] = [];
  // _auxCatalogosList: any[] = [];
  _marcasList: Imarca[] = [];
  _showArticulos: boolean = true;
  _showCatalogos: boolean = false;
  _showMarcas: boolean = false;

  // filtros para Catalogos y Marcas
  _idCategoria: string = "0";
  _idMarca: string = "0";

  // titulos para filtros
  _tituloCatalogo: string = "Catálogos";
  _tituloMarca: string = "Marcas";

  constructor(private _servicios: ServiciosService, private _toastr: ToastrService, private _router: Router, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {

    sessionStorage.setItem("ventanaAnterior", "feed");

    // ACTIVA ICONOS DEL MENU TOP
    this._servicios.menuTopIconos({menuFijo: false,
      btnMenu : true,
      titulo: true,
      btnBuscar: true,
      btnCerrar: false,
      btnRegresar: false,
      btnConfig: true,
      valorTitulo: ""});
      
    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));
    this._articulosList = JSON.parse(sessionStorage.getItem("articulosList"));
    this._empresa = JSON.parse(sessionStorage.getItem("empresa"));

  }

  getArticulos(todos: boolean) {
    if(todos) {
      this._idCategoria = "0";
      this._idMarca = "0";
      this._tituloCatalogo = "Catalogos";
      this._tituloMarca = "Marcas";
      sessionStorage.setItem("idCategoria", this._idCategoria);
      sessionStorage.setItem("idMarca", this._idMarca);
      sessionStorage.removeItem("articuloVenta");
    }
    
    this._servicios.wsGeneral("getArticulos", { idEmpresa: this._idEmpresa, orden: 'RE', idCategoria: this._idCategoria, idMarca: this._idMarca,  buscar: "" })
      .subscribe(x => {
        this._articulosList = x;
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Artículos")
      , () => {
        sessionStorage.setItem("articulosList", JSON.stringify(this._articulosList));
        this._showArticulos = true;
        this._showCatalogos= false;
        this._showMarcas = false;
      });
  }

  getCatalogos(){
    sessionStorage.removeItem("articuloVenta");

    this._servicios.wsGeneral("getCatalogos", { idEmpresa: this._idEmpresa})
      .subscribe(resp => {
        this._catalogosList = resp
        .filter(cat => cat.ctdArticulos > 0)
        .map(x => {
                    x.imagen = x.imagen ?? ""; 
                    return x;});
        
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Catálogos")
      , () => {
        this._showArticulos = false;
        this._showCatalogos = true;
        this._showMarcas = false;
        this._tituloCatalogo = "Catálogos";
        this._tituloMarca = "Marcas";
      });
  }

  getMarcas() {
    sessionStorage.removeItem("articuloVenta");
    this._servicios.wsGeneral("getMarcas", { idEmpresa: this._idEmpresa})
      .subscribe(resp => {
          this._marcasList = resp.filter(art => art.ctdArticulos > 0)
                                 .map(x => {
                                      x.imagen = x.imagen ?? "";
                                      return x;
                                  })
      }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Marcas")
      , () => {
        this._showArticulos = false;
        this._showCatalogos = false;
        this._showMarcas = true;
        this._tituloMarca = "Marcas";
        this._tituloCatalogo = "Catálogos";
      });
  }

  getArticuloCatalogo(idCategoria: string) {
    this._idCategoria = idCategoria;
    this._idMarca = "0";
    this._tituloCatalogo = idCategoria;
    sessionStorage.setItem("idCategoria", this._idCategoria );
    this.getArticulos(false);
  }

  getArticuloMarca(idMarca: string) {
    this._idMarca = idMarca;
    this._idCategoria = "0";
    this._tituloMarca = idMarca;
    sessionStorage.setItem("idMarca", this._idMarca);
    this.getArticulos(false);
  }

  swiper(itemArticulo: Iarticulo){
    sessionStorage.setItem("articuloVenta", JSON.stringify(itemArticulo));
    this._router.navigate(["/swiper"]) ;
  }

  getImagen(urlImagen: string) {
    return ((urlImagen) ?? this._urlIMG + "/assets/img/imagenFondoGeneral.jpg");
  }

}
