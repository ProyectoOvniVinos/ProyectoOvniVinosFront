import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { ModalInventarioGComponent } from '../../Modal/modal-inventario-g/modal-inventario-g.component';

@Component({
  selector: 'app-inventario-general',
  templateUrl: './inventario-general.component.html',
  styleUrls: ['./inventario-general.component.css']
})
export class InventarioGeneralComponent implements OnInit {

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
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(producto: ProductoModel): void {
    const dialogRef = this.dialog.open(ModalInventarioGComponent, {
      width: '50%',
      data: producto,
    });
  }

}
