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

  constructor(private _http: HttpClient, private _router: Router) { }

  wsGeneral(ws: string, param: any ): Observable<any> {
    return this._http.post(this.apiURL + "/" + ws, param);
  }

  wsWhatsApp(mesaje: string): Observable<any>  {
    return this._http.get('https://api.whatsapp.com/send?phone=+528331545422&text=hola%20bb')
    
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

}

