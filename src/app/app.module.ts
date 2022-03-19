import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoSwiperComponent } from './catalogo-swiper/catalogo-swiper.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { MenuFooterComponent } from './menu-footer/menu-footer.component';
import { MenuHeaderSwiperComponent } from './menu-header-swiper/menu-header-swiper.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoSwiperComponent,
    MenuHeaderComponent,
    MenuFooterComponent,
    MenuHeaderSwiperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
