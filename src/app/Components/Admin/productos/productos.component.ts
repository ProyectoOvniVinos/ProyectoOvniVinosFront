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

  bandera: boolean;
  banderaErrores: boolean;

  productos: ProductoModel[] = [];
  errores: string[];

  constructor(private router: Router, private service: ProductoService ) { }

  ngOnInit(): void {
    this.obtenerProductos();


  }

  obtenerProductos(){
    this.service.getProducts().subscribe( productos => {
      this.productos=productos;
      console.log(this.productos);
      
      if(this.productos.length==0){
        this.bandera=false;
      }else{
        this.productos.sort(function (a, b) {
          // A va primero que B
          if (a.estado > b.estado)
              return -1;
          // B va primero que A
          else if (a.estado < b.estado)
              return 1;
          // A y B son iguales
          else 
              return 0;
      });
        
        this.bandera=true;
      }
      
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

  buscar(event){
    console.log(event.target.value);
    let name: string =event.target.value;

    if(name.length==0){
      this.obtenerProductos();
      this.banderaErrores=false
      console.log(this.banderaErrores);
      
    }else{
      this.service.getProductByName(name).subscribe((productos:any) => {
        this.productos=productos;
        this.banderaErrores=false;
        console.log(this.banderaErrores);
        
  
      }, err => {
        this.errores = err.error.mensaje
        this.banderaErrores=true
        console.log(this.banderaErrores);
        
      })     
    }
  }

}
