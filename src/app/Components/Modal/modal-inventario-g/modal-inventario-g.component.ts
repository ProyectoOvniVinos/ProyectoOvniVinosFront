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

  datosRegistro: Inventario_generalModel;
  datos: Inventario_generalModel = 
    {
      idRegistro:1,
      cantidadProducto:24,
      codigoProducto: {
        codigoProducto: 1,
        nombreProducto: "Vino Abocado",
        precioProducto: 13000,
        precioProductoProveedor: 10000,
        descripcionProducto:"Lorem",
        fotoProducto: "../../../../assets/TEMPORALES/vino1.jpg",
        estado : "1"
      },
      detalles: [
        {
          idDetalles: 1,
          cantidadProducto: 6,
          fechaUltimoIngreso:  new Date("2020-05-16")
        },
        {
          idDetalles: 1,
          cantidadProducto: 6,
          fechaUltimoIngreso:  new Date("2020-05-16")
        },
        {
          idDetalles: 1,
          cantidadProducto: 6,
          fechaUltimoIngreso:  new Date("2020-05-16")
        },
        {
          idDetalles: 1,
          cantidadProducto: 6,
          fechaUltimoIngreso:  new Date("2020-05-16")
        }
      ]
    }
  ;
  
  constructor(    
    public dialogRef: MatDialogRef<ModalInventarioGComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Inventario_generalModel ) 
    { }

  
  onNoClick(): void{
    this.dialogRef.close();
  }  

  

  ngOnInit(): void {

  }

}
