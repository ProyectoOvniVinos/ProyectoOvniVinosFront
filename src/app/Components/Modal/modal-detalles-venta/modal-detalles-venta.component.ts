import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentaModel } from '../../../Models/Venta.model';

@Component({
  selector: 'app-modal-detalles-venta',
  templateUrl: './modal-detalles-venta.component.html',
  styleUrls: ['./modal-detalles-venta.component.css']
})
export class ModalDetallesVentaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalDetallesVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public venta: VentaModel) { }

  ngOnInit(): void {
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
