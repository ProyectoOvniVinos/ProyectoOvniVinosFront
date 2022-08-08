import { ProductoModel } from 'src/app/Models/Producto.model';
import { DialogData } from './../DialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent implements OnInit {

  productoRecomendado: ProductoModel;
  productos: ProductoModel[] = [
    {
      codigo_producto: 1,
      nombre_producto: 'Vino Abocado',
      precio_producto: 13000,
      precio_producto_proveedor: 6000,
      descripcion_producto: 'Delicioso Vino Dulce',
      foto_producto: '../../../../assets/TEMPORALES/vino1.jpg'
    }, {
      codigo_producto: 2,
      nombre_producto: 'Vino tinto',
      precio_producto: 13000,
      precio_producto_proveedor: 6000,
      descripcion_producto: 'Delicioso Vino no tan Dulce',
      foto_producto: '../../../../assets/TEMPORALES/vino2.jpg'
    }, {
      codigo_producto: 3,
      nombre_producto: 'Nectar de uva',
      precio_producto: 10000,
      precio_producto_proveedor: 5000,
      descripcion_producto: 'Delicioso nectar de uva libre de alcohol',
      foto_producto: '../../../../assets/TEMPORALES/vino3.jpg'
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public producto:ProductoModel
  ) { }

  onNoClick(): void{
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.productos.forEach( producto => {
      if(producto.codigo_producto==this.producto.codigo_producto){
        this.productoRecomendado=producto
      }else{
        this.productoRecomendado==null;
      }
    })
  }

}
