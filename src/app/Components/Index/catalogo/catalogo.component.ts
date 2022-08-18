import { ModalProductosComponent } from './../../Modal/modal-productos/modal-productos.component';
import { Component, OnInit } from '@angular/core';
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
export class CatalogoComponent implements OnInit {

  inventarioGeneral: Inventario_generalModel[] = [];
  validarCarrito = false;

  

  constructor(public dialog: MatDialog, private productoService: ProductoService, private carritoService:CarritoService, private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.productoService.getProductsInventario().subscribe(inventario => {

      this.inventarioGeneral = inventario;
    })
  }

  buscar(termino:string){
    
  }

  agregar(producto:ProductoModel){
    this.clienteService.getByEmail("c@gmail.com").subscribe((resp:ClienteModel)=>{
      let newItem = new ItemCarritoModel();
      newItem.cantidadProducto = 1;
      newItem.codigoProducto = producto
      newItem.precioItem = producto.precioProducto

      resp.carrito.itemCarrito.push(newItem);
      this.carritoService.actualizarCarrito(resp.carrito).subscribe(resp=>{
        console.log(resp);
        
      })
      
      
    })
  }

  openDialog(inventario: Inventario_generalModel): void {
    const dialogRef = this.dialog.open(ModalProductosComponent, {
      width: '50%',
      data: inventario,
    });
  }

  cambiarImg1(event){
    //console.log(event.target.src);

  }

  cambiarImg2(event){
    //console.log(event.target.src);
  }

  filtro(text:string){
    this.inventarioGeneral = [];
    if(text!="Todos"){
      this.productoService.getProductsEstadoFiltro(text).subscribe(inventario => {
        this.inventarioGeneral = inventario;
        console.log(inventario);
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
