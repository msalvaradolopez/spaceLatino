import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoSwiperComponent } from './catalogo-swiper/catalogo-swiper.component';
import { LoaderComponent } from './loader/loader.component';



const routes: Routes = [
  {path: "loader", component: LoaderComponent},
  { path: '', redirectTo: 'loader', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
