import { ProductoModel } from './../../../Models/Producto.model';
import { Inventario_generalModel } from './../../../Models/Inventario_general.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-productos-admin',
  templateUrl: './modal-productos-admin.component.html',
  styleUrls: ['./modal-productos-admin.component.css']
})
export class ModalProductosAdminComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalProductosAdminComponent>,
              @Inject(MAT_DIALOG_DATA) public producto:ProductoModel ) { }

  
  onNoClick(): void{
    this.dialogRef.close();
  }  

  

  ngOnInit(): void {

  }
}
