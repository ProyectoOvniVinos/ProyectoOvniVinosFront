import { Item_ventaModel } from './../../../Models/Item_venta.model';
import { VentaModel } from './../../../Models/Venta.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item_compraModel } from 'src/app/Models/Item_compra.model';
import { ProductoModel } from 'src/app/Models/Producto.model';

@Component({
  selector: 'app-ingresar-venta',
  templateUrl: './ingresar-venta.component.html',
  styleUrls: ['./ingresar-venta.component.css']
})
export class IngresarVentaComponent implements OnInit {

  venta = new VentaModel();
  total: number=0;

  itemVaciar = new Item_compraModel();

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
    }, {
      codigoProducto: 4,
      nombreProducto: 'Nectar de uva azul',
      precioProducto: 10000,
      precioProductoProveedor: 5000,
      descripcionProducto: 'Delicioso nectar de uva libre de alcohol',
      fotoProducto: '../../../../assets/TEMPORALES/vino3.jpg'
    }, {
      codigoProducto: 5,
      nombreProducto: 'Nectar x',
      precioProducto: 10000,
      precioProductoProveedor: 5000,
      descripcionProducto: 'Delicioso nectar de uva libre de alcohol',
      fotoProducto: '../../../../assets/TEMPORALES/vino3.jpg'
    },

  ];

  banderaProducto: boolean = false;
  banderaCantidad: boolean = false;
  banderaPrecio: boolean = false;
  ventaForm !: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {

  }

  get productoNoValido() {
    if (this.ventaForm.get('producto')?.touched) {
      if (this.ventaForm.get('producto')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }

  }

  get cantidadNoValido() {
    if (this.ventaForm.get('cantidad')?.touched) {
      if (this.ventaForm.get('cantidad')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
  }
  get precioNoValido() {
    if (this.ventaForm.get('precio')?.touched) {
      if (this.ventaForm.get('precio')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
  }

  crearFormulario() {
    this.ventaForm = this.fb.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: [[Validators.required]]
    })
  }


  // Metodos para los items

  seleccionarProducto() {
    let producto: ProductoModel = {
      nombreProducto: this.productos.find(producto => producto.codigoProducto == this.ventaForm.controls['producto'].value).nombreProducto,
      precioProducto: this.productos.find(producto => producto.codigoProducto == this.ventaForm.controls['producto'].value).precioProducto,
      precioProductoProveedor: this.ventaForm.controls['precio'].value - 100,
      descripcionProducto: 'descripcion producto',
      codigoProducto: this.ventaForm.controls['producto'].value,
      fotoProducto: 'img',
    }
    // let producto1 = event.option.value as ProductoModel;
    console.log("El codigo del producto elegido es " + this.ventaForm.controls['producto'].value);

    if (this.existeItem(producto.codigoProducto)) {
      this.incrementaCantidad(producto.codigoProducto);
    }else {
      let nuevoItem = new Item_ventaModel();
      nuevoItem.cantidadProducto = this.ventaForm.controls['cantidad'].value;
      nuevoItem.codigoProducto = producto;
      this.venta.ventas.push(nuevoItem);
    }

    this.actualizarTotal()


  }
  existeItem(id: number): boolean {
    let existe = false;
    this.venta.ventas.forEach((item: Item_ventaModel) => {
      if (id === item.codigoProducto.codigoProducto) {
        existe = true
      }
    });
    return existe;
  }

  actualizarTotal(){
    let total = 0;
    this.venta.ventas.forEach((item: Item_ventaModel) => {
      total = total + item.calcularImporte();
    })
    this.total=total;
  }

  incrementaCantidad(id: number): void {
    this.venta.ventas = this.venta.ventas.map((item: Item_ventaModel) => {
      if (id === item.codigoProducto.codigoProducto) {
        console.log("AAAAAAAAAAA " + item.cantidadProducto);
        let suma: number = this.ventaForm.controls['cantidad'].value;
        item.cantidadProducto = item.cantidadProducto + suma;
      }
      return item;
    });
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }
    this.venta.ventas = this.venta.ventas.map((item: Item_ventaModel) => {
      if (id === item.codigoProducto.codigoProducto) {
        item.cantidadProducto = cantidad;
      }
      return item;
    });
    this.actualizarTotal();
  }

  aumentarCantidad(id: number){
    this.venta.ventas = this.venta.ventas.map((item: Item_ventaModel) => {
      if (id === item.codigoProducto.codigoProducto) {
        item.cantidadProducto++;
      }
      return item;
    })
    this.actualizarTotal();
  }
  disminuirCantidad(id: number, cantidad:number){
    if(cantidad == 1){
      this.eliminarItemFactura(id);
    }
    this.venta.ventas = this.venta.ventas.map((item: Item_ventaModel) => {
      if (id === item.codigoProducto.codigoProducto) {
        item.cantidadProducto--;
      }
      return item;
    })
    this.actualizarTotal();
  }

  eliminarItemFactura(id: number): void {
    this.venta.ventas = this.venta.ventas.filter((item: Item_ventaModel) => id !== item.codigoProducto.codigoProducto);
    this.actualizarTotal();
  }

}
