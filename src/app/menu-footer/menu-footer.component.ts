import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Icarrito, Ifavorito, Ipedido } from '../modelo-db';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.css']
})
export class MenuFooterComponent implements OnInit, OnDestroy {

  _favotiros: Ifavorito[] = [];
  _carritoList: Icarrito[] = [];
  _ctdFavotiros: number = 0;
  _ctdPedidos: number = 0;
  _subFavoritos: Subscription;
  _subPedidos: Subscription;

  constructor(private _servicios: ServiciosService) { }

  ngOnInit(): void {

    this._subFavoritos = this._servicios.favoritos$
    .subscribe(resp => {
      this.ctdFavoritos();
    });

    this._subPedidos = this._servicios.pedido$
    .subscribe(resp => {
      this.ctdPedidos();
    });

    this.ctdFavoritos();
    this.ctdPedidos();
  }

  ctdFavoritos() {
    this._favotiros = JSON.parse(sessionStorage.getItem("favoritos"));
    if(!this._favotiros)
      this._favotiros = [];

    this._ctdFavotiros = this._favotiros.reduce((acum) => acum + 1, 0);
  }

  ctdPedidos() {
    this._carritoList = JSON.parse( sessionStorage.getItem("_carrito") );
    if(!this._carritoList)
      this._carritoList = [];

    this._ctdPedidos = this._carritoList.reduce((acum, valor) => acum + valor.cantidad, 0);
  }

  accionBoton() {
    console.log("accion boton 1");
  }

  ngOnDestroy(): void {
    this._subFavoritos.unsubscribe();
    this._subPedidos.unsubscribe();
  }
}
