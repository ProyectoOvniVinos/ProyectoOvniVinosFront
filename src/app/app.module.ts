import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './Components/Client/registro/registro.component';
import { InventarioGeneralComponent } from './Components/Admin/inventario-general/inventario-general.component';
import { AgregarExistenciasComponent } from './Components/Admin/agregar-existencias/agregar-existencias.component';
import { EditarDatosComponent } from './Components/Client/editar-datos/editar-datos.component';
import { CatalogoComponent } from './Components/Index/catalogo/catalogo.component';
import { ClientesComponent } from './Components/Admin/clientes/clientes.component';
import { InventarioDetallesComponent } from './Components/Admin/inventario-detalles/inventario-detalles.component';
import { IniciarSesionComponent } from './Components/Index/iniciar-sesion/iniciar-sesion.component';
import { ProductosComponent } from './Components/Admin/productos/productos.component';
import { ContabilidadComponent } from './Components/Admin/contabilidad/contabilidad.component';
import { RecuperarPasswordComponent } from './Components/Index/recuperar-password/recuperar-password.component';
import { RecuperandoPasswordComponent } from './Components/Index/recuperando-password/recuperando-password.component';

import { SidebarComponent } from './Components/Index/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatosClienteComponent } from './Components/Client/datos-cliente/datos-cliente.component';
import { SlideshowComponent } from './Components/Index/slideshow/slideshow.component';
import { CarritoComponent } from './Components/Client/carrito/carrito.component';

import { AgregarProductoComponent } from './Components/Admin/agregar-producto/agregar-producto.component';

import { HistorialComponent } from './Components/Client/historial/historial.component';
import { AyudaComponent } from './Components/Client/ayuda/ayuda.component';
import { DatosAdminComponent } from './Components/Admin/datos-admin/datos-admin.component';
import { EditarDatosAdmComponent } from './Components/Admin/editar-datos-adm/editar-datos-adm.component';
import { VentasComponent } from './Components/Admin/ventas/ventas.component';
import { ComprasComponent } from './Components/Admin/compras/compras.component';
import { IngresarCompraComponent } from './Components/Admin/ingresar-compra/ingresar-compra.component';
import { ModalErrorComponent } from './Components/Modal/modal-error/modal-error.component';

import { MatDialogModule } from '@angular/material/dialog';
import { ModalInteraccionComponent } from './Components/Modal/modal-interaccion/modal-interaccion.component';
import { IngresarVentaComponent } from './Components/Admin/ingresar-venta/ingresar-venta.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalProductosComponent } from './Components/Modal/modal-productos/modal-productos.component';
import { ModalInventarioGComponent } from './Components/Modal/modal-inventario-g/modal-inventario-g.component';
import { ModalConfirmarCompraComponent } from './Components/Modal/modal-confirmar-compra/modal-confirmar-compra.component';
import { ModalVentaComponent } from './Components/Modal/modal-venta/modal-venta.component';
import { HeaderComponent } from './Components/Index/header/header.component';
import { ModalDetallesCompraComponent } from './Components/Modal/modal-detalles-compra/modal-detalles-compra.component';
import { ModalImagenComponent } from './Components/Modal/modal-imagen/modal-imagen.component';
import { ModalProductosAdminComponent } from './Components/Modal/modal-productos-admin/modal-productos-admin.component';
import { ModalLoadingComponent } from './Components/Modal/modal-loading/modal-loading.component';
import { ModalDetallesVentaComponent } from './Components/Modal/modal-detalles-venta/modal-detalles-venta.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AdministradoresComponent } from './Components/Admin/administradores/administradores.component';
import { RegistrarAdminComponent } from './Components/Admin/registrar-admin/registrar-admin.component';
import { CambioPasswordAComponent } from './Components/Admin/cambio-password-a/cambio-password-a.component';
import { CambioPasswordCComponent } from './Components/Client/cambio-password-c/cambio-password-c.component';
 
registerLocaleData(localeEs, 'es');
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    InventarioGeneralComponent,
    AgregarExistenciasComponent,
    EditarDatosComponent,
    CatalogoComponent,
    ClientesComponent,
    InventarioDetallesComponent,
    IniciarSesionComponent,
    ProductosComponent,
    ContabilidadComponent,
    SidebarComponent,
    RecuperarPasswordComponent,
    RecuperandoPasswordComponent,
    DatosClienteComponent,
    SlideshowComponent,
    CarritoComponent,

    AgregarProductoComponent,
    HistorialComponent,
    AyudaComponent,
    DatosAdminComponent,
    EditarDatosAdmComponent,
    VentasComponent,
    ComprasComponent,
    IngresarCompraComponent,
    ModalErrorComponent,
    ModalInteraccionComponent,
    IngresarVentaComponent,
    ModalProductosComponent,
    ModalInventarioGComponent,
    ModalConfirmarCompraComponent,
    ModalVentaComponent,
    HeaderComponent,
    ModalDetallesCompraComponent,
    ModalImagenComponent,
    ModalProductosAdminComponent,
    ModalLoadingComponent,
    ModalDetallesVentaComponent,
    AdministradoresComponent,
    ModalDetallesVentaComponent,
    RegistrarAdminComponent,
    CambioPasswordAComponent,
    CambioPasswordCComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
