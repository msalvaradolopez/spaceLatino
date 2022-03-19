import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoSwiperComponent } from './catalogo-swiper/catalogo-swiper.component';


const routes: Routes = [
  {path: "catalogo-swiper", component: CatalogoSwiperComponent},
  { path: '', redirectTo: 'catalogo-swiper', pathMatch: 'full' },
  { path: '**', component: CatalogoSwiperComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
