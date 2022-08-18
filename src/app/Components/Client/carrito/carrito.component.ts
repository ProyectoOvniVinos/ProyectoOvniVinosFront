import { Component, OnInit, Input } from '@angular/core';
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
export class CarritoComponent implements OnInit {

  carrito:CarritoClienteModel;

  @Input() modal:boolean = false;

  constructor(private clienteService:ClienteService, private carritoCliente:CarritoService) {

  }

  ngOnInit(): void {
    this.clienteService.getByEmail('c@gmail.com').subscribe((resp:ClienteModel)=>{
      console.log(resp);
      
      this.carrito = resp.carrito;
    })
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
    this.carritoCliente.actualizarCarrito(this.carrito).subscribe(resp=>{
      console.log(resp);
      
    });
  }
  

}
