import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  apiURL: string = environment.apiURL;

  private _buscar = new Subject<string>();
  buscar$ = this._buscar.asObservable();

  private _menuTopIconos = new Subject<string>();
  menuTopIconos$ = this._menuTopIconos.asObservable();

  private _dosColumnas = new Subject<boolean>();
  dosColumnas$ = this._dosColumnas.asObservable();

  private _iconosAcciones = new Subject<string>();
  iconosAcciones$ = this._iconosAcciones.asObservable();

  private _swiper = new Subject<boolean>();
  swiper$ = this._swiper.asObservable();

  private _msgPopupOk = new Subject<string>();
  msgPopupOk$ = this._msgPopupOk.asObservable();

  private _login = new Subject<boolean>();
  login$ = this._login.asObservable();

  private _favoritos = new Subject<boolean>();
  favoritos$ = this._favoritos.asObservable();

  private _pedido = new Subject<boolean>();
  pedido$ = this._pedido.asObservable();

  constructor(private _http: HttpClient, private _router: Router) { }

  wsGeneral(ws: string, param: any ): Observable<any> {
    return this._http.post(this.apiURL + "/" + ws, param);
  }

  wsWhatsApp(mensaje: string): void  {
    console.log("servicio", mensaje);
    let mensajeWhatApp: string = 'https://api.whatsapp.com/send?phone='+mensaje;

    //return this._http.get(mensajeWhatApp);
    window.open(mensajeWhatApp);
    
  }

  buscar(buscar: string) {
    this._buscar.next(buscar);
  }

  menuTopIconos(iconos: any) {
    this._menuTopIconos.next(iconos);
  }

  dosColumnas(accion: boolean) {
    this._dosColumnas.next(accion);
  }

  iconosAcciones(acciones: string) {
    this._iconosAcciones.next(acciones);
  }

  swiper(accion: boolean) {
    this._swiper.next(accion);
  }

  msgPopupOk(mensaje: string) {
    this._msgPopupOk.next(mensaje);
  }

  login(accion: boolean) {
    this._login.next(accion);
  }

  actFavorito(){
    this._favoritos.next();
  }

  actPedido(){
    this._pedido.next();
  }


}

