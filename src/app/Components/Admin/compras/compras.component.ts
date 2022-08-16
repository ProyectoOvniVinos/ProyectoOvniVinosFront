import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/Models/Producto.model';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  productos: ProductoModel[] = [
    {
      codigoProducto: 1,
      nombreProducto: 'Vino Abocado',
      precioProducto: 13000,
      precioProductoProveedor: 6000,
      descripcionProducto: 'Delicioso Vino Dulce',
      fotoProducto: '../../../../assets/TEMPORALES/vino1.jpg'
    }, {
      codigoProducto: 2,
      nombreProducto: 'Vino tinto',
      precioProducto: 13000,
      precioProductoProveedor: 6000,
      descripcionProducto: 'Delicioso Vino no tan Dulce',
      fotoProducto: '../../../../assets/TEMPORALES/vino2.jpg'
    }, {
      codigoProducto: 3,
      nombreProducto: 'Nectar de uva',
      precioProducto: 10000,
      precioProductoProveedor: 5000,
      descripcionProducto: 'Delicioso nectar de uva libre de alcohol',
      fotoProducto: '../../../../assets/TEMPORALES/vino3.jpg'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
