import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './Components/Admin/productos/productos.component';
import { CatalogoComponent } from './Components/Index/catalogo/catalogo.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: '/catalogo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
