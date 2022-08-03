import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  @Input() modal:boolean = false;

  imgModal: string = '';

  productos: ProductoModel[] = [];

  constructor(private router: Router, private service: ProductoService ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.service.getProducts().subscribe( productos => {
      this.productos=productos;
    });
  }

  cerrarModal(){
    this.modal = false;
  }

  abrirModal(imgModal:string){
    this.imgModal = imgModal;
    this.modal = true;
  }

  irAgregarProducto(){
    this.router.navigate(['/agregarProducto'])
  }

}
