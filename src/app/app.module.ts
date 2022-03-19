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
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
