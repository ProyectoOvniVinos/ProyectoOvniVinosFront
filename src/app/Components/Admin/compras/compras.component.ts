import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompraModel } from 'src/app/Models/Compra.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { CompraService } from 'src/app/Services/compra.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  compras:CompraModel[];
  constructor(public compraService:CompraService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.compraService.getCompras().subscribe(resp=>{
      this.compras = resp
    })
  }
  abrirModal(compra:CompraModel){
    let data = ""
    let contador =1;
    compra.compras.forEach(itemCompra=>{
      console.log(contador);
      
      data += "      Item numero       " + contador +"\tNombre producto: "+itemCompra.codigoProducto.nombreProducto + "\n" +
      "\tCantidad: " + itemCompra.cantidadProducto+ "\t" +
      "\tPrecio item: "+ itemCompra.precioCompraDetalle + "\t"
      contador+=1
    })
    this.openDialog("Items",data)
  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '700px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

}
