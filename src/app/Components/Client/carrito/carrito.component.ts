import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, OnChanges, EventEmitter , Output } from '@angular/core';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
  
})
export class CarritoComponent implements OnInit, OnChanges {

  carrito:CarritoClienteModel;
  variable:boolean = true
  valorTotal:number=0;
  cantidadTotal:number=0;

  @Input() modal:boolean = false;

  @Input() clienteInp:ClienteModel;
  
  @Output()
  devolver = new EventEmitter<any>();

  constructor(private clienteService:ClienteService, private carritoService:CarritoService) {

  }
  ngOnChanges(): void {
    this.carrito =this.clienteInp.carrito
    this.clienteService.getByEmail(this.clienteInp.correoCliente).subscribe((resp:ClienteModel)=>{
      console.log(resp);
      
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

    this.valorTotal-=(item.precioItem*item.cantidadProducto)
    this.cantidadTotal-=item.cantidadProducto;
    this.devolver.emit(list);
  }
  aumentarCantidad(item:ItemCarritoModel){
    
    item.cantidadProducto += 1
    this.cantidadTotal+=1;
    this.valorTotal+=item.precioItem;
    this.carritoService.actualizarCarrito(this.carrito).subscribe(resp=>{
      console.log(resp);
      
    });
  }
  disminuirCantidad(item:ItemCarritoModel){
    item.cantidadProducto-=1;
    this.cantidadTotal-=1;
    this.valorTotal-=item.precioItem;
    this.carritoService.actualizarCarrito(this.carrito).subscribe(resp=>{
      console.log(resp);
      
    });
  }
  

}
