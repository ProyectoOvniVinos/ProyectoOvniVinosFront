import { ModalProductosComponent } from './../../Modal/modal-productos/modal-productos.component';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModel } from '../../../Models/Producto.model';
import { ProductoService } from '../../../Services/producto.service';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit, OnChanges {

  inventarioGeneral: Inventario_generalModel[] = [];
  validarCarrito = false;
  agrandar = false;
  eliminar=false;

  clienteInp:ClienteModel;

  constructor(public dialog: MatDialog, private productoService: ProductoService, private carritoService:CarritoService, private clienteService:ClienteService) { }
  ngOnChanges() {
    this.clienteService.getByEmail("c@gmail.com").subscribe(resp=>{
      this.clienteInp = resp;
    })
  }

  ngOnInit(): void {
    this.productoService.getProductsInventario().subscribe(inventario => {

      this.inventarioGeneral = inventario;
    })
    this.clienteService.getByEmail("c@gmail.com").subscribe(resp=>{
      this.clienteInp = resp;
    })
  }

  buscar(termino:String){
    console.log(termino);
    
    
  }

  agregar(producto:ProductoModel){
    this.clienteService.getByEmail("c@gmail.com").subscribe((resp:ClienteModel)=>{
      let flag = false;
      resp.carrito.itemCarrito.forEach(item=>{
        if(item.codigoProducto.codigoProducto == producto.codigoProducto){
          item.cantidadProducto = item.cantidadProducto+1;
          flag=true;
          
        }
      })
      if(flag==false){
        let newItem = new ItemCarritoModel();
        newItem.cantidadProducto = 1;
        newItem.codigoProducto = producto
        newItem.precioItem = producto.precioProducto
  
        resp.carrito.itemCarrito.push(newItem);
      }
      
      
      this.carritoService.actualizarCarrito(resp.carrito).subscribe(resp=>{
        this.clienteInp.carrito = resp.carrito;
        
        
        
      })
      
      
    })
    
    this.agrandar=true;
    setTimeout(()=>{
      this.agrandar = false;
    },1000)
    if(this.validarCarrito){
      this.recargarCarrito();
      
    }
  }

  recargarCarrito(){
    this.validarCarrito = false;
      setTimeout(()=>{
        this.validarCarrito = true;
      },50)
  }
  openDialog(inventario: Inventario_generalModel): void {
    const dialogRef = this.dialog.open(ModalProductosComponent, {
      width: '50%',
      
      data: inventario,
    });
    dialogRef.afterClosed().subscribe( (result:boolean) => {
      if(result==true){
        this.agregar(inventario.codigoProducto);
        
      }else{
        console.log("en else");
        
      }
    });
  }

  procesarDevolver(mensaje:any){
    this.agrandar=true;
    setTimeout(()=>{
      this.agrandar = false;
    },1000)
    this.clienteInp.carrito=mensaje.objeto;
    if(this.validarCarrito && mensaje.variable==false){
      
      this.recargarCarrito();
    }
    
  }
  filtro(text:string){
    this.inventarioGeneral = [];
    if(text!="Todos"){
      this.productoService.getProductsEstadoFiltro(text).subscribe(inventario => {
        this.inventarioGeneral = inventario;
      })
    }else{
      this.productoService.getProductsInventario().subscribe(inventario => {

        this.inventarioGeneral = inventario;
      })
    }
  }

  mostrarCarrito(){
    this.validarCarrito=!this.validarCarrito;
  }

}
