import { CambioPasswordAComponent } from './Components/Admin/cambio-password-a/cambio-password-a.component';
import { RegistrarAdminComponent } from './Components/Admin/registrar-admin/registrar-admin.component';
import { AdministradoresComponent } from './Components/Admin/administradores/administradores.component';
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

import { AgregarProductoComponent } from './Components/Admin/agregar-producto/agregar-producto.component';

import { HistorialComponent } from './Components/Client/historial/historial.component';
import { AyudaComponent } from './Components/Client/ayuda/ayuda.component';
import { DatosAdminComponent } from './Components/Admin/datos-admin/datos-admin.component';
import { EditarDatosAdmComponent } from './Components/Admin/editar-datos-adm/editar-datos-adm.component';
import { ClientesComponent } from './Components/Admin/clientes/clientes.component';
import { InventarioGeneralComponent } from './Components/Admin/inventario-general/inventario-general.component';
import { ContabilidadComponent } from './Components/Admin/contabilidad/contabilidad.component';
import { VentasComponent } from './Components/Admin/ventas/ventas.component';
import { ComprasComponent } from './Components/Admin/compras/compras.component';
import { InventarioDetallesComponent } from './Components/Admin/inventario-detalles/inventario-detalles.component';
import { IngresarCompraComponent } from './Components/Admin/ingresar-compra/ingresar-compra.component';
import { IngresarVentaComponent } from './Components/Admin/ingresar-venta/ingresar-venta.component';
import { CambioPasswordCComponent } from './Components/Client/cambio-password-c/cambio-password-c.component';
import { RoleGuard } from './Guards/role.guard';


const routes: Routes = [
  { path: 'catalogo', component: CatalogoComponent},
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'agregarProducto', component: AgregarProductoComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },

  { path: 'editarProducto/:id', component: AgregarProductoComponent , canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  { path: 'iniciarSesion', component: IniciarSesionComponent },
  { path: 'recuperar', component: RecuperarPasswordComponent },
  { path: 'registro', component: RegistroComponent },
  // { path: 'recuperando', component: RecuperandoPasswordComponent },
  { path: 'datosC', component: DatosClienteComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_CLIENTE' } },
  { path: 'editarC', component: EditarDatosComponent , canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_CLIENTE' }},
  { path: 'historialC', component: HistorialComponent , canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_CLIENTE' } },
  { path: 'ayuda', component: AyudaComponent },

  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }  },
  { path: 'administradores', component: AdministradoresComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'datosA', component: DatosAdminComponent , canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  { path: 'editarA', component: EditarDatosAdmComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'contabilidad', component: ContabilidadComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'inventarioG', component: InventarioGeneralComponent , canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  { path: 'inventarioD', component: InventarioDetallesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'compras', component: ComprasComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'ingresarCompra', component: IngresarCompraComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'ingresarCompra/:id', component: IngresarCompraComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'ingresarVenta', component: IngresarVentaComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},
  { path: 'agregarAdmin', component: RegistrarAdminComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'recuperacion/:correo', component: RecuperandoPasswordComponent },
  { path: 'cambiarContraseñaC', component: CambioPasswordCComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_CLIENTE' } },
  { path: 'cambiarContraseñaA', component: CambioPasswordAComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }},

  { path: '**', pathMatch: 'full', redirectTo: '/catalogo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
