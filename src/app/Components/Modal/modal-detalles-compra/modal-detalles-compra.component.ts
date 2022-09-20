import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompraModel } from '../../../Models/Compra.model';

@Component({
  selector: 'app-modal-detalles-compra',
  templateUrl: './modal-detalles-compra.component.html',
  styleUrls: ['./modal-detalles-compra.component.css']
})
export class ModalDetallesCompraComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalDetallesCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public compra: CompraModel
  ) { }

  onNoClick(): void{
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
