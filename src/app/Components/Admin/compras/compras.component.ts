import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompraModel } from '../../../Models/Compra.model';
import { CompraService } from '../../../Services/compra.service';
import { ModalDetallesCompraComponent } from '../../Modal/modal-detalles-compra/modal-detalles-compra.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  compras:CompraModel[];
  banderaC:boolean = null;

  constructor(public compraService:CompraService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.compraService.getCompras().subscribe(resp=>{
      this.compras = resp
      if(this.compras.length==0){
        this.banderaC = false;
      }else{
        this.banderaC = true;
      }
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
