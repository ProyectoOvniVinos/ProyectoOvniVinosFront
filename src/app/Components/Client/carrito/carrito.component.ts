import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, OnChanges, EventEmitter , Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PedidoModel } from 'src/app/Models/Pedido.model';
import { DarkModeService } from 'src/app/Services/dark-mode.service';
import { PedidosRestService } from 'src/app/Services/pedidos-rest.service';
import { SocketPedidoService } from 'src/app/Services/socket-pedido.service';
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

  carrito:CarritoClienteModel;
  variable:boolean = true;
  advertirCantidad = false;
  cantidadP:number = 0;
  valorTotal:number=0;
  cantidadTotal:number=0;
  itemClick:number;
  banderaCarrito:Boolean=false;
  banderaClase:Boolean=false;

  @Input() modal:boolean = false;

  @Input() clienteInp:ClienteModel;
  
  @Output()
  devolver = new EventEmitter<any>();


 
  constructor(private clienteService:ClienteService, 
              private carritoService:CarritoService, 
              private inventarioService:InventarioGService,
              public dialog: MatDialog, 
              private ventaService: VentaService,
              public darkMode: DarkModeService,
              private pedidoService: PedidosRestService,
              private pedidoSocket: SocketPedidoService,
              private router: Router) {

  }
  ngOnChanges(): void {
    this.carrito =this.clienteInp.carrito
    this.clienteService.getByEmail(this.clienteInp.correoCliente).subscribe((resp:ClienteModel)=>{
      this.carrito = resp.carrito;
      this.carrito.itemCarrito.forEach(item => {
        
        this.valorTotal= this.carrito.precioCarrito;
        this.cantidadTotal+= item.cantidadProducto;

      });

    })
  }

  ngOnInit(): void {
    this.cambioClase();
  }

  cambioClase(){

    if(document.body.classList.value=="darkMode"){
      this.banderaClase=true;
    }else{
      this.banderaClase=false;
    }
  }

  calcularTotal(){
   let valores:number=0;
    this.carrito.itemCarrito.forEach(res=>{
      valores = valores + (res.cantidadProducto*res.precioItem)
    })
    this.valorTotal=valores;
  }

  cerrarModal(){
    this.modal=false
  }

  abrirModalProducto(item:ItemCarritoModel){

    this.inventarioService.getInventarioGeneralByProducto(item.codigoProducto.codigoProducto).subscribe((inventario:Inventario_generalModel)=>{
      inventario.cantidadProducto=0;
      this.openDialogtwo(inventario)
      
    });
  }

  openDialogtwo(inventario: Inventario_generalModel): void {
    const pageWidth  = document.documentElement.scrollWidth;
    let width='50%'
    if(pageWidth<=1400){
        width='70%'
    }
    const dialogRef = this.dialog.open(ModalProductosComponent, {
      width: width,
      data: inventario
    });
    dialogRef.afterClosed().subscribe( (result:boolean) => {
      if(result==true){
/*         this.agregar(inventario.codigoProducto); */
        
      }else{
        
      }
    });
  }

  cantidadProductos(){
    return this.carrito.itemCarrito.length;
  }

  eliminarItem(event, item:ItemCarritoModel){
    if(event!=""){
      event.stopPropagation();
    }

    this.itemClick=item.codigoProducto.codigoProducto
    this.carrito.itemCarrito = this.carrito.itemCarrito.filter((res) => res !== item)
    this.carritoService.actualizarCarrito(this.carrito).subscribe(resp=>{
      
    });
    this.banderaCarrito=false;
    let list:Object={
      objeto:this.carrito,
      variable:true,
      banderaCarrito:this.banderaCarrito
    }

    this.valorTotal-=(item.codigoProducto.precioProducto*item.cantidadProducto);
    this.cantidadTotal-=item.cantidadProducto;
    this.devolver.emit(list);
  }
  aumentarCantidad(event, item:ItemCarritoModel){
    event.stopPropagation();
    this.itemClick=item.codigoProducto.codigoProducto
    this.inventarioService.getInventarioGeneralByProducto(item.codigoProducto.codigoProducto).subscribe((resp:Inventario_generalModel)=>{
      this.cantidadP = resp.cantidadProducto
      if(this.cantidadP>item.cantidadProducto){
        item.cantidadProducto += 1
        this.advertirCantidad = false;
        
        this.carritoService.actualizarCarrito(this.carrito).subscribe(resp=>{
          this.cantidadTotal=this.cantidadTotal + 1;
          this.valorTotal=resp.carrito.precioCarrito;
        });

      }else{
        this.advertirCantidad = true;

      }
    })
  }
  disminuirCantidad(event, item:ItemCarritoModel){
    event.stopPropagation();
    if(item.cantidadProducto==1){
      this.openDialogInteraction("Advertencia",`Eliminara el producto de su carrito. ¿Desea eliminarlo?`, item);
    }else{
      this.advertirCantidad = false;
      item.cantidadProducto-=1;

      this.carritoService.actualizarCarrito(this.carrito).subscribe(resp=>{
        this.cantidadTotal=this.cantidadTotal - 1;
        this.valorTotal=resp.carrito.precioCarrito;

      });
    }
  }
  
  abrirModal(){
    
    if(this.carrito.itemCarrito.length==0){
      this.openDialog2("Advertencia","Su carrito esta vacio para hacer una compra debe haber minimo un producto.")
    }else{
      let venta: VentaModel = new VentaModel();
      let cantidad = 0; 
      this.carrito.itemCarrito.map(item=>{
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

      // this.router.navigate(['/pedidos/1']);
      this.openDialog(venta);
    }
    
  }
  openDialog2(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }
  openDialog( venta: VentaModel): void {
    let ventaInterna: VentaModel; 
    const dialogRef = this.dialog.open(ModalConfirmarCompraComponent, {
      width: '700px',
      data: venta,
    });
    dialogRef.afterClosed().subscribe( (result:any)=>{
      if(result==false){
      }else{
        ventaInterna = result.venta;
        if(result.esDomi){
          ventaInterna.correoCliente.direccionCliente=result.venta.correoCliente.direccionCliente
        }else{
  
        }
        
        if(ventaInterna!=null){
          let cliente = new ClienteModel();
          cliente.correoCliente = ventaInterna.correoCliente.correoCliente;
          cliente.direccionCliente = ventaInterna.correoCliente.direccionCliente;
          cliente.nombreCliente = ventaInterna.correoCliente.nombreCliente;
          cliente.passwordCliente = ventaInterna.correoCliente.passwordCliente;
          cliente.telefonoCliente = ventaInterna.correoCliente.telefonoCliente;
          cliente.ventas = ventaInterna.correoCliente.ventas;
          cliente.carrito = ventaInterna.correoCliente.carrito;
          ventaInterna.correoCliente = cliente;
  
          this.ventaService.addVenta(ventaInterna, result.esDomi).subscribe(venta =>{
            this.banderaCarrito=true
            this.valorTotal=0
            this.cantidadTotal=0
            this.openDialogConfirmacion("Exito!!!","Se ha realizado la compra satisfactoriamente!")
            let pedido: PedidoModel = new PedidoModel();
            pedido.cliente = venta.venta.correoCliente;
            pedido.venta = venta.venta;
            pedido.estado = '1';
            this.pedidoService.createPedido(pedido).subscribe();
            this.pedidoSocket.actualizarPedidos();
            for(let i = this.carrito.itemCarrito.length; i>0;i--){
              this.carrito.itemCarrito.pop()
            }
            this.carritoService.actualizarCarrito(this.carrito).subscribe();
  
            let list:Object={
              objeto:this.carrito,
              variable:true,
              banderaCarrito:this.banderaCarrito
            }
        
            this.devolver.emit(list);
          },err => {
            if(err.error.mensaje=="cantidad insuficiente"){
              this.openDialogConfirmacion("Advertencia!!",`${err.error.mensaje}`)
            }else{
              this.openDialogConfirmacion("Error","Ha ocurrido un problema")
            }
              });
        }
      }
      
    });
  }
  openDialogInteraction(titleNew: string, mensajeNew: string, item:ItemCarritoModel):void{
    const dialogRef = this.dialog.open(ModalInteraccionComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
    dialogRef.afterClosed().subscribe( (result:boolean) => {
      if(result==true){
        this.eliminarItem("",item);
      }else{

      }
    });
  }

  openDialogConfirmacion(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

}

