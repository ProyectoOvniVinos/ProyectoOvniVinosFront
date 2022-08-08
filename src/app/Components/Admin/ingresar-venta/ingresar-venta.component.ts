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
    }, {
      codigo_producto: 4,
      nombre_producto: 'Nectar de uva azul',
      precio_producto: 10000,
      precio_producto_proveedor: 5000,
      descripcion_producto: 'Delicioso nectar de uva libre de alcohol',
      foto_producto: '../../../../assets/TEMPORALES/vino3.jpg'
    }, {
      codigo_producto: 5,
      nombre_producto: 'Nectar x',
      precio_producto: 10000,
      precio_producto_proveedor: 5000,
      descripcion_producto: 'Delicioso nectar de uva libre de alcohol',
      foto_producto: '../../../../assets/TEMPORALES/vino3.jpg'
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
      nombre_producto: this.productos.find(producto => producto.codigo_producto == this.ventaForm.controls['producto'].value).nombre_producto,
      precio_producto: this.productos.find(producto => producto.codigo_producto == this.ventaForm.controls['producto'].value).precio_producto,
      precio_producto_proveedor: this.ventaForm.controls['precio'].value - 100,
      descripcion_producto: 'descripcion producto',
      codigo_producto: this.ventaForm.controls['producto'].value,
      foto_producto: 'img',
    }
    // let producto1 = event.option.value as ProductoModel;
    console.log("El codigo del producto elegido es " + this.ventaForm.controls['producto'].value);

    if (this.existeItem(producto.codigo_producto)) {
      this.incrementaCantidad(producto.codigo_producto);
    }else {
      let nuevoItem = new Item_ventaModel();
      nuevoItem.cantidad_producto = this.ventaForm.controls['cantidad'].value;
      nuevoItem.producto = producto;
      this.venta.items.push(nuevoItem);
    }

    this.actualizarTotal()


  }
  existeItem(id: number): boolean {
    let existe = false;
    this.venta.items.forEach((item: Item_ventaModel) => {
      if (id === item.producto.codigo_producto) {
        existe = true
      }
    });
    return existe;
  }

  actualizarTotal(){
    let total = 0;
    this.venta.items.forEach((item: Item_ventaModel) => {
      total = total + item.calcularImporte();
    })
    this.total=total;
  }

  incrementaCantidad(id: number): void {
    this.venta.items = this.venta.items.map((item: Item_ventaModel) => {
      if (id === item.producto.codigo_producto) {
        console.log("AAAAAAAAAAA " + item.cantidad_producto);
        let suma: number = this.ventaForm.controls['cantidad'].value;
        item.cantidad_producto = item.cantidad_producto + suma;
      }
      return item;
    });
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }
    this.venta.items = this.venta.items.map((item: Item_ventaModel) => {
      if (id === item.producto.codigo_producto) {
        item.cantidad_producto = cantidad;
      }
      return item;
    });
    this.actualizarTotal();
  }

  aumentarCantidad(id: number){
    this.venta.items = this.venta.items.map((item: Item_ventaModel) => {
      if (id === item.producto.codigo_producto) {
        item.cantidad_producto++;
      }
      return item;
    })
    this.actualizarTotal();
  }
  disminuirCantidad(id: number, cantidad:number){
    if(cantidad == 1){
      this.eliminarItemFactura(id);
    }
    this.venta.items = this.venta.items.map((item: Item_ventaModel) => {
      if (id === item.producto.codigo_producto) {
        item.cantidad_producto--;
      }
      return item;
    })
    this.actualizarTotal();
  }

  eliminarItemFactura(id: number): void {
    this.venta.items = this.venta.items.filter((item: Item_ventaModel) => id !== item.producto.codigo_producto);
    this.actualizarTotal();
  }

}
