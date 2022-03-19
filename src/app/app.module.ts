import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoSwiperComponent } from './catalogo-swiper/catalogo-swiper.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoSwiperComponent,
    MenuHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
