import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductoModel } from '../../../Models/Producto.model';
import { ProductoService } from '../../../Services/producto.service';
import { ModalImagenComponent } from '../../Modal/modal-imagen/modal-imagen.component';
import { ModalLoadingComponent } from '../../Modal/modal-loading/modal-loading.component';
import { ModalProductosAdminComponent } from '../../Modal/modal-productos-admin/modal-productos-admin.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  @Input() modal:boolean = false;

  bandera: boolean;
  banderaErrores: boolean;

  productos: ProductoModel[] = [];
  errores: string[];

  constructor(private router: Router, 
              private service: ProductoService, 
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  openDialog(img:string): void {
    const dialogRef = this.dialog.open(ModalImagenComponent, {
      width: '500px',
      data: img ,
    });
  }

  openDialogTwo(producto: ProductoModel): void {
    const dialogRef = this.dialog.open(ModalProductosAdminComponent, {
      width: '50%',
      data: producto ,
    });
  }

  openDialogLoading(){
    const dialogRef = this.dialog.open(ModalLoadingComponent, {
      width: '130px'
    });
  }

  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
  }

  obtenerProductos(){

    this.service.getProducts().subscribe( productos => {
      this.productos=productos;
      
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
      
    }, err => {

    });
  }

  cerrarModal(){
    this.modal = false;
  }

  abrirModal(imgModal:string){
    
    this.openDialog(imgModal);
  }

  abrirModalTwo(producto: ProductoModel){
    this.openDialogTwo(producto);
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
