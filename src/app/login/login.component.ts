import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  _idEmpresa: number = 0;

  _showLogin: boolean = false;
  isLogged: boolean = false;
  socialUser: SocialUser;
  userLogged: SocialUser;
  _subLogin: Subscription;

  constructor(private _toastr: ToastrService, private authService: SocialAuthService, private _servicios: ServiciosService) { }

  ngOnInit(): void {

    this._idEmpresa = parseInt(sessionStorage.getItem("idEmpresa"));

    this._subLogin = this._servicios.login$
      .subscribe(resp => {

        this.authService.authState.subscribe(
          data => {
            this.socialUser = data;
            this.isLogged = (this.socialUser != null);
          } 
        );
        
        this._showLogin = resp;
      });
  }

  regresar(){
    this._showLogin = false;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        this.isLogged = (this.socialUser != null);

        if(this.isLogged)
          this._servicios.wsGeneral("insUsuarioGoogle", {idEmpresa: this._idEmpresa, idUsuario: this.socialUser.email})
          .subscribe(x => {
          }, error => this._toastr.error("Error : " + error.error.ExceptionMessage, "Generar pedido")
          , () => {
            
          });

        this.regresar();
      }
    );
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
    this.isLogged = false
    this.socialUser = null;    
  }

  ngOnDestroy(): void {
    this._subLogin.unsubscribe();
  }  

}
