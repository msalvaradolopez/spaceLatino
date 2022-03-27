import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spaceLatino';

  _idEmpresa: string = "1";

  constructor( ) { }

  ngOnInit(): void {

      sessionStorage.setItem("idEmpresa", this._idEmpresa);
  }
}
