import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  _showLogin: boolean = false;
  _subLogin: Subscription;

  constructor(private authService: SocialAuthService, private _servicios: ServiciosService) { }

  ngOnInit(): void {

    this._subLogin = this._servicios.login$
      .subscribe(resp => {
        this._showLogin = resp;
        
      });
  }

  regresar(){
    this._showLogin = false;
  }

    signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data)
        this.regresar();
      }
    );
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }

}
