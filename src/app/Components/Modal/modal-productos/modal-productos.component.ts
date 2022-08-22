import { ProductoModel } from 'src/app/Models/Producto.model';
import { DialogData } from './../DialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { ClienteService } from 'src/app/Services/cliente.service';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent implements OnInit {

  productoRecomendado: ProductoModel;
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

  constructor(
    public dialogRef: MatDialogRef<ModalProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public inventario:Inventario_generalModel,
    public clienteService:ClienteService,
    public carritoService:CarritoService)
   {

  }
   

  onNoClick(): void{
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.inventario);

    
    
    this.productos.forEach( producto => {
      if(producto.codigoProducto==this.inventario.codigoProducto.codigoProducto){
        this.productoRecomendado=producto
      }else{
        this.productoRecomendado==null;
      }
    })
  }
  

}
