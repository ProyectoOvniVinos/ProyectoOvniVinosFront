import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, OnChanges, EventEmitter , Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';
import { Item_ventaModel } from 'src/app/Models/Item_venta.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { VentaModel } from 'src/app/Models/Venta.model';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { InventarioGService } from 'src/app/Services/inventario-g.service';
import { VentaService } from 'src/app/Services/venta.service';
import { ModalConfirmarCompraComponent } from '../../Modal/modal-confirmar-compra/modal-confirmar-compra.component';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { ModalInteraccionComponent } from '../../Modal/modal-interaccion/modal-interaccion.component';


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

  @Input() modal:boolean = false;

  @Input() clienteInp:ClienteModel;
  
  @Output()
  devolver = new EventEmitter<any>();


 
  constructor(private clienteService:ClienteService, 
              private carritoService:CarritoService, 
              private inventarioService:InventarioGService,
              public dialog: MatDialog, 
              private ventaService: VentaService) {

  }
  ngOnChanges(): void {
    this.carrito =this.clienteInp.carrito
    this.clienteService.getByEmail(this.clienteInp.correoCliente).subscribe((resp:ClienteModel)=>{
      
      this.carrito = resp.carrito;
      this.carrito.itemCarrito.forEach(item => {
        
        this.valorTotal+=(item.precioItem*item.cantidadProducto);
        this.cantidadTotal+=(item.cantidadProducto);

      });

    })
  }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modal = false;
  }

  /* abrirModal(){
    this.modal = true;
  } */

  cantidadProductos(){
    return this.carrito.itemCarrito.length;
  }

  eliminarItem(item:ItemCarritoModel){

    this.itemClick=item.codigoProducto.codigoProducto
    this.carrito.itemCarrito = this.carrito.itemCarrito.filter((res) => res !== item)
    this.carritoService.actualizarCarrito(this.carrito).subscribe(resp=>{
      
    });

    let list:Object={
      objeto:this.carrito,
      variable:true
    }

    this.valorTotal-=(item.precioItem*item.cantidadProducto)
    this.cantidadTotal-=item.cantidadProducto;
    this.devolver.emit(list);
  }
  aumentarCantidad(item:ItemCarritoModel){
    
    this.itemClick=item.codigoProducto.codigoProducto
    this.inventarioService.getInventarioGeneralByProducto(item.codigoProducto.codigoProducto).subscribe((resp:Inventario_generalModel)=>{
      this.cantidadP = resp.cantidadProducto
      if(this.cantidadP>item.cantidadProducto){
        item.cantidadProducto += 1
        this.advertirCantidad = false;

        this.carritoService.actualizarCarrito(this.carrito).subscribe(resp=>{

        });
      }else{
        this.advertirCantidad = true;

      }
    })
  }
  disminuirCantidad(item:ItemCarritoModel){
    if(item.cantidadProducto==1){
      this.openDialogInteraction("Advertencia",`Eliminara el producto de su carrito. ¿Desea eliminarlo?`, item);
    }else{
      this.advertirCantidad = false;
      item.cantidadProducto-=1;

      this.carritoService.actualizarCarrito(this.carrito).subscribe(resp=>{

      });
    }
  }
  
  abrirModal(){
    let venta: VentaModel = new VentaModel();
    
    console.log(this.carrito);
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

    this.openDialog(venta);
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
        ventaInterna = result;
      }

      if(ventaInterna!=null){
        this.ventaService.addVenta(ventaInterna).subscribe(venta =>{

          this.openDialogConfirmacion("Exito!!!","Se ha realizado la compra satisfactoriamente!")
          for(let i = this.carrito.itemCarrito.length; i>0;i--){
            this.carrito.itemCarrito.pop()
          }
          this.carritoService.actualizarCarrito(this.carrito).subscribe();
          let list:Object={
            objeto:this.carrito,
            variable:true
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
    });
  }
  openDialogInteraction(titleNew: string, mensajeNew: string, item:ItemCarritoModel):void{
    const dialogRef = this.dialog.open(ModalInteraccionComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
    dialogRef.afterClosed().subscribe( (result:boolean) => {
      if(result==true){
        this.eliminarItem(item);
      }else{
        console.log("en else");

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

