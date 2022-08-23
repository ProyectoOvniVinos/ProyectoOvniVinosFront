import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentaModel } from 'src/app/Models/Venta.model';
import { VentaService } from 'src/app/Services/venta.service';
import { ModalDetallesCompraComponent } from '../modal-detalles-compra/modal-detalles-compra.component';

@Component({
  selector: 'app-modal-confirmar-compra',
  templateUrl: './modal-confirmar-compra.component.html',
  styleUrls: ['./modal-confirmar-compra.component.css']
})
export class ModalConfirmarCompraComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalDetallesCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public venta: VentaModel) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
