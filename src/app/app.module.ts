import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/Index/footer/footer.component';
import { RegistroComponent } from './Components/Client/registro/registro.component';
import { InventarioGeneralComponent } from './Components/Admin/inventario-general/inventario-general.component';
import { AgregarExistenciasComponent } from './Components/Admin/agregar-existencias/agregar-existencias.component';
import { EditarDatosComponent } from './Components/Client/editar-datos/editar-datos.component';
import { CatalogoComponent } from './Components/Index/catalogo/catalogo.component';
import { ClientesComponent } from './Components/Admin/clientes/clientes.component';
import { EditarProductoComponent } from './Components/Admin/editar-producto/editar-producto.component';
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




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegistroComponent,
    InventarioGeneralComponent,
    AgregarExistenciasComponent,
    EditarDatosComponent,
    CatalogoComponent,
    ClientesComponent,
    EditarProductoComponent,
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
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
