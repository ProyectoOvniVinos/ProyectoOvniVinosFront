import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { Inventario_detallesModel } from 'src/app/Models/Inventario_detalles.model';
import { DialogData } from '../DialogData';
import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';

@Component({
  selector: 'app-modal-inventario-g',
  templateUrl: './modal-inventario-g.component.html',
  styleUrls: ['./modal-inventario-g.component.css']
})
export class ModalInventarioGComponent implements OnInit {

  datosRegistro: Inventario_detallesModel;
  datos: Inventario_detallesModel[] = [
    {
      idDetalles: 3,
      cantidadProducto: 4,
      fechaUltimoIngreso: new Date(),
    },

    {
      idDetalles: 6,
      cantidadProducto: 12,
      fechaUltimoIngreso: new Date ("12-08-2022"),
    },

    {
      idDetalles: 8,
      cantidadProducto: 3,
      fechaUltimoIngreso: new Date ("12-08-2022"),
    },
    
  ];
  
  constructor(    
    public dialogRef: MatDialogRef<ModalInventarioGComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ProductoModel ) 
    { }

  
  onNoClick(): void{
    this.dialogRef.close();
  }  

  

  ngOnInit(): void {

  }

}
