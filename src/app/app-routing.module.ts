import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './Components/Admin/productos/productos.component';
import { RegistroComponent } from './Components/Client/registro/registro.component';
import { CatalogoComponent } from './Components/Index/catalogo/catalogo.component';
import { IniciarSesionComponent } from './Components/Index/iniciar-sesion/iniciar-sesion.component';
import { RecuperarPasswordComponent } from './Components/Index/recuperar-password/recuperar-password.component';
import { RecuperandoPasswordComponent } from './Components/Index/recuperando-password/recuperando-password.component';
import { DatosClienteComponent } from './Components/Client/datos-cliente/datos-cliente.component';
import { AuthGuard } from './Guards/auth.guard';
import { EditarDatosComponent } from './Components/Client/editar-datos/editar-datos.component';
<<<<<<< HEAD
import { CarritoComponent } from './Components/Client/carrito/carrito.component';
import { AgregarProductoComponent } from './Components/Admin/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './Components/Admin/editar-producto/editar-producto.component';
=======
import { HistorialComponent } from './Components/Client/historial/historial.component';
import { AyudaComponent } from './Components/Client/ayuda/ayuda.component';
import { DatosAdminComponent } from './Components/Admin/datos-admin/datos-admin.component';
import { EditarDatosAdmComponent } from './Components/Admin/editar-datos-adm/editar-datos-adm.component';
>>>>>>> 35958e9d4caa31b44b97bded25eb37d3bc1b1162

const routes: Routes = [
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'agregarProducto', component: AgregarProductoComponent },
  { path: 'editarProducto/:id', component: EditarProductoComponent },
  { path: 'iniciarSesion', component: IniciarSesionComponent },
  { path: 'recuperar', component: RecuperarPasswordComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperando', component: RecuperandoPasswordComponent },
  { path: 'datosC', component: DatosClienteComponent },
  { path: 'editarC', component: EditarDatosComponent },
  { path: 'historialC', component: HistorialComponent },
  { path: 'ayuda', component: AyudaComponent },

  { path: 'datosA', component: DatosAdminComponent },
  { path: 'editarA', component: EditarDatosAdmComponent },

  { path: '**', pathMatch: 'full', redirectTo: '/catalogo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
