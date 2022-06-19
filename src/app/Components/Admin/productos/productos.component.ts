import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/Models/Producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  productos: ProductoModel[] = [
    {
      codigo_producto: 1,
      nombre_producto: 'Vino Abocado',
      precio_producto: 13000,
      precio_productoProveedor: 6000,
      descripcion_producto: 'Delicioso Vino Dulce',
      imagen: '../../../../assets/TEMPORALES/vino1.jpg'
    }, {
      codigo_producto: 2,
      nombre_producto: 'Vino tinto',
      precio_producto: 13000,
      precio_productoProveedor: 6000,
      descripcion_producto: 'Delicioso Vino no tan Dulce',
      imagen: '../../../../assets/TEMPORALES/vino2.jpg'
    }, {
      codigo_producto: 3,
      nombre_producto: 'Nectar de uva',
      precio_producto: 10000,
      precio_productoProveedor: 5000,
      descripcion_producto: 'Delicioso nectar de uva libre de alcohol',
      imagen: '../../../../assets/TEMPORALES/vino3.jpg'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
