import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './Components/Admin/productos/productos.component';
import { RegistroComponent } from './Components/Client/registro/registro.component';
import { CatalogoComponent } from './Components/Index/catalogo/catalogo.component';
import { IniciarSesionComponent } from './Components/Index/iniciar-sesion/iniciar-sesion.component';
import { RecuperarPasswordComponent } from './Components/Index/recuperar-password/recuperar-password.component';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'iniciarSesion', component: IniciarSesionComponent },
  { path: 'recuperar', component: RecuperarPasswordComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/catalogo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
