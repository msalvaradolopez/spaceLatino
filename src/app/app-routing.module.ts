import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloVentaComponent } from './articulo-venta/articulo-venta.component';
import { CatalogoSwiperComponent } from './catalogo-swiper/catalogo-swiper.component';
import { LoaderComponent } from './loader/loader.component';



const routes: Routes = [
  {path: "loader", component: LoaderComponent},
  {path: "articuloventa", component: ArticuloVentaComponent},
  { path: '', redirectTo: 'loader', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
