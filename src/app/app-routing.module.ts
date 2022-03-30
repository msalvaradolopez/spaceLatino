import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloVentaComponent } from './articulo-venta/articulo-venta.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CatalogoSwiperComponent } from './catalogo-swiper/catalogo-swiper.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { FeedNegocioComponent } from './feed-negocio/feed-negocio.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path: "articuloventa", component: ArticuloVentaComponent},
  {path: "carrito", component: CarritoComponent},
  {path: "feed", component: FeedNegocioComponent},
  {path: "swiper", component: CatalogoSwiperComponent},
  {path: "loader", component: LoaderComponent},
  {path: "favotiros", component: FavoritosComponent},
  { path: '', redirectTo: 'loader', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
