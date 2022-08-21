import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { Inventario_detallesModel } from 'src/app/Models/Inventario_detalles.model';
import { DialogData } from '../DialogData';
import { DatePipe, DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';

@Component({
  selector: 'app-modal-inventario-g',
  templateUrl: './modal-inventario-g.component.html',
  styleUrls: ['./modal-inventario-g.component.css']
})
export class ModalInventarioGComponent implements OnInit {

  constructor(    
    public dialogRef: MatDialogRef<ModalInventarioGComponent>,
    @Inject(MAT_DIALOG_DATA) public inventario:Inventario_generalModel ) 
    { }

  
  onNoClick(): void{
    this.dialogRef.close();
  }  

  

  ngOnInit(): void {
    console.log(this .inventario);
    
  }

}
