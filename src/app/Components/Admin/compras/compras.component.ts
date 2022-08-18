import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompraModel } from 'src/app/Models/Compra.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { CompraService } from 'src/app/Services/compra.service';
import { ModalDetallesCompraComponent } from '../../Modal/modal-detalles-compra/modal-detalles-compra.component';
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
    this.openDialog(compra)
  }

  openDialog( compra: CompraModel): void {
    const dialogRef = this.dialog.open(ModalDetallesCompraComponent, {
      width: '700px',
      data: compra,
    });
  }

}
