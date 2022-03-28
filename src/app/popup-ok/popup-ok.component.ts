import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-popup-ok',
  templateUrl: './popup-ok.component.html',
  styleUrls: ['./popup-ok.component.css']
})
export class PopupOkComponent implements OnInit {

  _showPopup: boolean = false;
  _subAcciones: Subscription;
  _mensaje = "Mensaje de pruebas";

  constructor(private _servicios: ServiciosService) { }

  ngOnInit(): void {

    this._subAcciones = this._servicios.msgPopupOk$
      .subscribe(resp => {
        this._mensaje = resp;
        this._showPopup = true;
        setTimeout(() => this._showPopup = false, 3000)
      });

  }
}
