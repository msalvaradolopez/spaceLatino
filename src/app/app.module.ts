import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoSwiperComponent } from './catalogo-swiper/catalogo-swiper.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuFooterComponent } from './menu-footer/menu-footer.component';
import { MenuHeaderSwiperComponent } from './menu-header-swiper/menu-header-swiper.component';
import { LoaderComponent } from './loader/loader.component';
import { ArticuloVentaComponent } from './articulo-venta/articulo-venta.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FeedNegocioComponent } from './feed-negocio/feed-negocio.component';
import { PopupOkComponent } from './popup-ok/popup-ok.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { LoginComponent } from './login/login.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { BuscarComponent } from './buscar/buscar.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoSwiperComponent,
    MenuHeaderComponent,
    MenuFooterComponent,
    MenuHeaderSwiperComponent,
    LoaderComponent,
    ArticuloVentaComponent,
    CarritoComponent,
    FeedNegocioComponent,
    PopupOkComponent,
    LoginComponent,
    FavoritosComponent,
    BuscarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1078377437989-k1pr30hef1ejet26ft1jiq8df5r4dio4.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('561602290896109'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'amzn1.application-oa2-client.f074ae67c0a146b6902cc0c4a3297935'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
