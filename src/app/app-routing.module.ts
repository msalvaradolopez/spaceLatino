import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloVentaComponent } from './articulo-venta/articulo-venta.component';
import { BuscarComponent } from './buscar/buscar.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CatalogoSwiperComponent } from './catalogo-swiper/catalogo-swiper.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { FeedNegocioComponent } from './feed-negocio/feed-negocio.component';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { MenuAuxComponent } from './menu-aux/menu-aux.component';



const routes: Routes = [
  {path: "articuloventa", component: ArticuloVentaComponent},
  {path: "carrito", component: CarritoComponent},
  {path: "feed", component: FeedNegocioComponent},
  {path: "swiper", component: CatalogoSwiperComponent},
  {path: "loader", component: LoaderComponent},
  {path: "favoritos", component: FavoritosComponent},
  {path: "buscar", component: BuscarComponent},
  {path: "menuaux", component: MenuAuxComponent},
  { path: '', redirectTo: 'loader', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
