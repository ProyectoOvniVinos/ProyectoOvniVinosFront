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

import { CarritoComponent } from './Components/Client/carrito/carrito.component';
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


const routes: Routes = [
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'agregarProducto', component: AgregarProductoComponent },
  { path: 'editarProducto/:id', component: AgregarProductoComponent },
  { path: 'iniciarSesion', component: IniciarSesionComponent },
  { path: 'recuperar', component: RecuperarPasswordComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperando', component: RecuperandoPasswordComponent },
  { path: 'datosC', component: DatosClienteComponent },
  { path: 'editarC', component: EditarDatosComponent },
  { path: 'historialC', component: HistorialComponent },
  { path: 'ayuda', component: AyudaComponent },

  { path: 'clientes', component: ClientesComponent },
  { path: 'administradores', component: AdministradoresComponent },
  { path: 'datosA', component: DatosAdminComponent },
  { path: 'editarA', component: EditarDatosAdmComponent },
  { path: 'contabilidad', component: ContabilidadComponent },
  { path: 'inventarioG', component: InventarioGeneralComponent },
  { path: 'inventarioD', component: InventarioDetallesComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'ingresarCompra', component: IngresarCompraComponent },
  { path: 'ingresarVenta', component: IngresarVentaComponent},
  { path: 'agregarAdmin', component: RegistrarAdminComponent },

  { path: '**', pathMatch: 'full', redirectTo: '/catalogo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
