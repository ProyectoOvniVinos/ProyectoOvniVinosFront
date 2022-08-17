import { ModalProductosComponent } from './../../Modal/modal-productos/modal-productos.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModel } from '../../../Models/Producto.model';
import { ProductoService } from '../../../Services/producto.service';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  inventarioGeneral: Inventario_generalModel[] = [];

  constructor(public dialog: MatDialog, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductsInventario().subscribe(inventario => {

      this.inventarioGeneral = inventario;
    })
  }

  buscar(termino:string){
    
  }

  agregar(){
    console.log("agregando");
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

}
