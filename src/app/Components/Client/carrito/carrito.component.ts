import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PedidoModel } from '../../../Models/Pedido.model';
import { DarkModeService } from '../../../Services/dark-mode.service';
import { PedidosRestService } from '../../../Services/pedidos-rest.service';
import { SocketPedidoService } from '../../../Services/socket-pedido.service';
import { CarritoClienteModel } from '../../../Models/CarritoCliente.model';
import { ClienteModel } from '../../../Models/Cliente.model';
import { Inventario_generalModel } from '../../../Models/Inventario_general.model';
import { ItemCarritoModel } from '../../../Models/itemCarrito.model';
import { Item_ventaModel } from '../../../Models/Item_venta.model';
import { VentaModel } from '../../../Models/Venta.model';
import { CarritoService } from '../../../Services/carrito.service';
import { ClienteService } from '../../../Services/cliente.service';
import { InventarioGService } from '../../../Services/inventario-g.service';
import { VentaService } from '../../../Services/venta.service';
import { ModalConfirmarCompraComponent } from '../../Modal/modal-confirmar-compra/modal-confirmar-compra.component';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { ModalInteraccionComponent } from '../../Modal/modal-interaccion/modal-interaccion.component';
import { ModalProductosComponent } from '../../Modal/modal-productos/modal-productos.component';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']

})
export class CarritoComponent implements OnInit, OnChanges {

  carrito: CarritoClienteModel;
  variable: boolean = true;
  advertirCantidad = false;
  cantidadP: number = 0;
  valorTotal: number = 0;
  cantidadTotal: number = 0;
  itemClick: number;
  banderaCarrito: Boolean = false;
  banderaClase: Boolean = false;

  @Input() modal: boolean = false;

  @Input() clienteInp: ClienteModel;

  @Output()
  devolver = new EventEmitter<any>();



  constructor(private clienteService: ClienteService,
    private carritoService: CarritoService,
    private inventarioService: InventarioGService,
    public dialog: MatDialog,
    private ventaService: VentaService,
    public darkMode: DarkModeService,
    private pedidoService: PedidosRestService,
    private pedidoSocket: SocketPedidoService,
    private router: Router) {

  }
  ngOnChanges(): void {
    this.carrito = this.clienteInp.carrito
    this.clienteService.getByEmail(this.clienteInp.correoCliente).subscribe((resp: ClienteModel) => {
      this.carrito = resp.carrito;
      this.carrito.itemCarrito.forEach(item => {

        this.valorTotal = this.carrito.precioCarrito;
        this.cantidadTotal += item.cantidadProducto;

      });

    })
  }

  ngOnInit(): void {
    this.cambioClase();
    const width =document.documentElement.scrollWidth;
    if(width < 500) {
      document.body.classList.add("carritoAbierto");
    }else{
      document.body.classList.remove("carritoAbierto");
    }
  }

  cambioClase() {

    if (document.body.classList.value == "darkMode") {
      this.banderaClase = true;
    } else {
      this.banderaClase = false;
    }
  }

  calcularTotal() {
    let valores: number = 0;
    this.carrito.itemCarrito.forEach(res => {
      valores = valores + (res.cantidadProducto * res.precioItem)
    })
    this.valorTotal = valores;
  }

  cerrarModal() {
    this.modal = false
  }

  abrirModalProducto(item: ItemCarritoModel) {

    this.inventarioService.getInventarioGeneralByProducto(item.codigoProducto.codigoProducto).subscribe((inventario: Inventario_generalModel) => {
      inventario.cantidadProducto = 0;
      this.openDialogtwo(inventario)

    });
  }

  openDialogtwo(inventario: Inventario_generalModel): void {
    const pageWidth = document.documentElement.scrollWidth;
    let width = '50%'
    if (pageWidth <= 1400) {
      width = '70%'
    }
    const dialogRef = this.dialog.open(ModalProductosComponent, {
      width: width,
      data: inventario
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result == true) {
        /*         this.agregar(inventario.codigoProducto); */

      } else {

      }
    });
  }

  cantidadProductos() {
    return this.carrito.itemCarrito.length;
  }

  eliminarItem(event, item: ItemCarritoModel) {
    if (event != "") {
      event.stopPropagation();
    }

    this.itemClick = item.codigoProducto.codigoProducto
    this.carrito.itemCarrito = this.carrito.itemCarrito.filter((res) => res !== item)
    this.carritoService.actualizarCarrito(this.carrito).subscribe(resp => {

    });
    this.banderaCarrito = false;
    let list: Object = {
      objeto: this.carrito,
      variable: true,
      banderaCarrito: this.banderaCarrito
    }

    this.valorTotal -= (item.codigoProducto.precioProducto * item.cantidadProducto);
    this.cantidadTotal -= item.cantidadProducto;
    this.devolver.emit(list);
  }
  aumentarCantidad(event, item: ItemCarritoModel) {
    event.stopPropagation();
    this.itemClick = item.codigoProducto.codigoProducto
    this.inventarioService.getInventarioGeneralByProducto(item.codigoProducto.codigoProducto).subscribe((resp: Inventario_generalModel) => {
      this.cantidadP = resp.cantidadProducto
      if (this.cantidadP > item.cantidadProducto) {
        item.cantidadProducto += 1
        this.advertirCantidad = false;

        this.carritoService.actualizarCarrito(this.carrito).subscribe(resp => {
          this.cantidadTotal = this.cantidadTotal + 1;
          this.valorTotal = resp.carrito.precioCarrito;
        });

      } else {
        this.advertirCantidad = true;

      }
    })
  }
  disminuirCantidad(event, item: ItemCarritoModel) {
    event.stopPropagation();
    if (item.cantidadProducto == 1) {
      this.openDialogInteraction("ADVERTENCIA", `Este producto se eliminará de su carrito. ¿Está seguro de eliminarlo?`, item);
    } else {
      this.advertirCantidad = false;
      item.cantidadProducto -= 1;

      this.carritoService.actualizarCarrito(this.carrito).subscribe(resp => {
        this.cantidadTotal = this.cantidadTotal - 1;
        this.valorTotal = resp.carrito.precioCarrito;

      });
    }
  }

  validarCarro(){
      document.body.classList.remove('carritoAbierto')
  }

  abrirModal() {

    if (this.carrito.itemCarrito.length == 0) {
      this.openDialog2("ADVERTENCIA", "Su carrito esta vacío, para hacer una compra debe haber mínimo un producto.")
    } else {
      this.validarCarro();
      let venta: VentaModel = new VentaModel();
      let cantidad = 0;
      this.carrito.itemCarrito.map(item => {
        let ventas: Item_ventaModel = new Item_ventaModel();
        cantidad += item.cantidadProducto;
        ventas.cantidadProducto = item.cantidadProducto;
        ventas.codigoProducto = item.codigoProducto;
        ventas.precioVentaDetalle = item.precioItem;
        venta.ventas.push(ventas);
      });

      venta.correoCliente = this.clienteInp;
      venta.precioVenta = this.carrito.precioCarrito;
      venta.cantidadVenta = cantidad;

      this.router.navigate(['/pedidos/1']);
      // this.openDialog(venta);
    }

  }
  openDialog2(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: { title: titleNew, mensaje: mensajeNew },
    });
  }

  openDialogInteraction(titleNew: string, mensajeNew: string, item: ItemCarritoModel): void {
    const dialogRef = this.dialog.open(ModalInteraccionComponent, {
      width: '300px',
      data: { title: titleNew, mensaje: mensajeNew },
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result == true) {
        this.eliminarItem("", item);
      } else {

      }
    });
  }

  openDialogConfirmacion(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: { title: titleNew, mensaje: mensajeNew },
    });
  }

}

