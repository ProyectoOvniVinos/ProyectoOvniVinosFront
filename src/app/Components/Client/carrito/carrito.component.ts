import { Component, OnInit, Input, OnChanges, EventEmitter , Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { InventarioGService } from 'src/app/Services/inventario-g.service';
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

  @Input() modal:boolean = false;

  @Input() clienteInp:ClienteModel;
  
  @Output()
  devolver = new EventEmitter<any>();

 
  constructor(private clienteService:ClienteService, private carritoService:CarritoService, private inventarioService:InventarioGService,public dialog: MatDialog) {

  }
  ngOnChanges(): void {
    this.carrito =this.clienteInp.carrito
    this.clienteService.getByEmail(this.clienteInp.correoCliente).subscribe((resp:ClienteModel)=>{
      console.log(resp);
      
      this.carrito = resp.carrito;
    })
  }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modal = false;
  }

  abrirModal(){
    this.modal = true;
  }

  cantidadProductos(){
    return this.carrito.itemCarrito.length;
  }

  eliminarItem(item:ItemCarritoModel){

    this.carrito.itemCarrito = this.carrito.itemCarrito.filter((res) => res !== item)
    this.carritoService.actualizarCarrito(this.carrito).subscribe(resp=>{
      console.log(resp);
      
    });

    let list:Object={
      objeto:this.carrito,
      variable:true
    }

    
    this.devolver.emit(list);
  }
  aumentarCantidad(item:ItemCarritoModel){
    this.inventarioService.getInventarioGeneralByProducto(item.codigoProducto.codigoProducto).subscribe((resp:Inventario_generalModel)=>{
      this.cantidadP = resp.cantidadProducto
      
      if(this.cantidadP>item.cantidadProducto){
        item.cantidadProducto += 1
        this.advertirCantidad = false;
        console.log(this.cantidadP + "disponible");
        console.log(item.cantidadProducto + "solicitada");
        
        this.carritoService.actualizarCarrito(this.carrito).subscribe(resp=>{
          console.log(resp);
          
        });
      }else{
        console.log(this.cantidadP + "disponible");
        console.log(item.cantidadProducto + "solicitada");
        console.log("BBBBBBBBBBBBBBBBBB");
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
        console.log(resp);
        
      });
    }
    
    
  }
  openDialogInteraction(titleNew: string, mensajeNew: string, item:ItemCarritoModel):void{
    const dialogRef = this.dialog.open(ModalInteraccionComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
    dialogRef.afterClosed().subscribe( (result:boolean) => {
      console.log(`Dialog result: ${result}`); // Pizza!
      if(result==true){
        this.eliminarItem(item);
      }else{
        console.log("en else");
        
      }
    });
  }

}
