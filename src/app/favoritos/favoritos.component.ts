import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iarticulo, Icarrito, Ifavorito } from '../modelo-db';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  _subIconosAcciones:  Subscription;

  _idEmpresa: number = 0;
  _ventanAnterior: string = "";
  _importeTotal: number = 0.00;
  _articulo: Iarticulo = null;

  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean = false;

  _favoritos: Ifavorito[] = [];

  constructor(private _servicios: ServiciosService, 
    private _toastr: ToastrService, 
    private _router: Router, 
    private sanitizer:DomSanitizer,
    private authService: SocialAuthService) { }

  ngOnInit(): void {
  

    this._favoritos = JSON.parse( sessionStorage.getItem("favoritos") );
    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));

    // ACTIVA ICONOS DEL MENU TOP
    this._servicios.menuTopIconos({menuFijo: false,
      btnMenu : true,
      titulo: true,
      btnBuscar: false,
      btnCerrar: false,
      btnRegresar: false,
      btnConfig: true,
      valorTitulo: "Mis Favoritos"});

    
    
    if(!this._favoritos)
      this._favoritos = [];

  }

  articuloVenta(articulo: Iarticulo) {
    let articuloVenta = JSON.stringify(articulo)
    sessionStorage.setItem("articuloVenta", articuloVenta);
    sessionStorage.setItem("ventanaAnterior", "favoritos");

    this._router.navigate(['/articuloventa']) ;
  }

  addFavorito(articulo: Iarticulo) {
    let subGoogle: Subscription;
    subGoogle = this.authService.authState.subscribe(
                  data => {
                    this.socialUser = data;
                    this.isLogged = (this.socialUser != null);
                  } 
                );
    
    if(this.isLogged) {
      if(this.getFavorito(articulo)) 
        this._favoritos = this._favoritos.filter(x => x.articulo.idArticulo != articulo.idArticulo);
      else 
        this._favoritos.push({articulo: articulo});

      sessionStorage.setItem("favoritos", JSON.stringify(this._favoritos));
      this._servicios.actFavorito();
      this._servicios.msgPopupOk("Favorito actualizado.");

      if (this._favoritos.length == 0)
        this._router.navigate(["/swiper"]) ;

    }

    
}

  getFavorito(articulo: Iarticulo): boolean {
    return (this._favoritos.filter(x => x.articulo.idArticulo == articulo.idArticulo).length > 0);
  }
}
