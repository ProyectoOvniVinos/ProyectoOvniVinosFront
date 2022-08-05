import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompraModel } from 'src/app/Models/Compra.model';
import { Item_compraModel } from 'src/app/Models/Item_compra.model';
import { ProductoModel } from 'src/app/Models/Producto.model';

@Component({
  selector: 'app-ingresar-compra',
  templateUrl: './ingresar-compra.component.html',
  styleUrls: ['./ingresar-compra.component.css']
})
export class IngresarCompraComponent implements OnInit {

  compra = new CompraModel();
  total: number=0;

  itemVaciar = new Item_compraModel();

  productos: ProductoModel[] = [
    {
      codigo_producto: 1,
      nombre_producto: 'Vino Abocado',
      precio_producto: 13000,
      precio_producto_proveedor: 6000,
      descripcion_producto: 'Delicioso Vino Dulce',
      imagen: '../../../../assets/TEMPORALES/vino1.jpg'
    }, {
      codigo_producto: 2,
      nombre_producto: 'Vino tinto',
      precio_producto: 13000,
      precio_producto_proveedor: 6000,
      descripcion_producto: 'Delicioso Vino no tan Dulce',
      imagen: '../../../../assets/TEMPORALES/vino2.jpg'
    }, {
      codigo_producto: 3,
      nombre_producto: 'Nectar de uva',
      precio_producto: 10000,
      precio_producto_proveedor: 5000,
      descripcion_producto: 'Delicioso nectar de uva libre de alcohol',
      imagen: '../../../../assets/TEMPORALES/vino3.jpg'
    }, {
      codigo_producto: 4,
      nombre_producto: 'Nectar de uva azul',
      precio_producto: 10000,
      precio_producto_proveedor: 5000,
      descripcion_producto: 'Delicioso nectar de uva libre de alcohol',
      imagen: '../../../../assets/TEMPORALES/vino3.jpg'
    }, {
      codigo_producto: 5,
      nombre_producto: 'Nectar x',
      precio_producto: 10000,
      precio_producto_proveedor: 5000,
      descripcion_producto: 'Delicioso nectar de uva libre de alcohol',
      imagen: '../../../../assets/TEMPORALES/vino3.jpg'
    },

  ];

  banderaProducto: boolean = false;
  banderaCantidad: boolean = false;
  banderaPrecio: boolean = false;
  compraForm !: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit(): void {

  }

  get productoNoValido() {
    if (this.compraForm.get('producto')?.touched) {
      if (this.compraForm.get('producto')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }

  }

  get cantidadNoValido() {
    if (this.compraForm.get('cantidad')?.touched) {
      if (this.compraForm.get('cantidad')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
  }
  get precioNoValido() {
    if (this.compraForm.get('precio')?.touched) {
      if (this.compraForm.get('precio')?.invalid == false) {
        return false;
      } else {
        return true;
      }
    } else {
      return null;
    }
  }

  crearFormulario() {
    this.compraForm = this.fb.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      precio: [[Validators.required]]
    })
  }


  // Metodos para los items

  seleccionarProducto() {
    let producto: ProductoModel = {
      nombre_producto: this.productos.find(producto => producto.codigo_producto == this.compraForm.controls['producto'].value).nombre_producto,
      precio_producto: this.compraForm.controls['precio'].value,
      precio_producto_proveedor: this.compraForm.controls['precio'].value - 100,
      descripcion_producto: 'descripcion producto',
      codigo_producto: this.compraForm.controls['producto'].value,
      imagen: 'img',
    }
    // let producto1 = event.option.value as ProductoModel;
    console.log("El codigo del producto elegido es " + this.compraForm.controls['producto'].value);

    if (this.existeItem(producto.codigo_producto)) {
      this.incrementaCantidad(producto.codigo_producto);
    }else {
      let nuevoItem = new Item_compraModel();
      nuevoItem.cantidad_producto = this.compraForm.controls['cantidad'].value;
      nuevoItem.producto = producto;
      this.compra.items.push(nuevoItem);
    }

    this.actualizarTotal()


  }
  existeItem(id: number): boolean {
    let existe = false;
    this.compra.items.forEach((item: Item_compraModel) => {
      if (id === item.producto.codigo_producto) {
        existe = true
      }
    });
    return existe;
  }

  actualizarTotal(){
    let total = 0;
    this.compra.items.forEach((item: Item_compraModel) => {
      total = total + item.calcularImporte();
    })
    this.total=total;
  }

  incrementaCantidad(id: number): void {
    this.compra.items = this.compra.items.map((item: Item_compraModel) => {
      if (id === item.producto.codigo_producto) {
        console.log("AAAAAAAAAAA " + item.cantidad_producto);
        let suma: number = this.compraForm.controls['cantidad'].value;
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
    this.compra.items = this.compra.items.map((item: Item_compraModel) => {
      if (id === item.producto.codigo_producto) {
        item.cantidad_producto = cantidad;
      }
      return item;
    });
    this.actualizarTotal();
  }

  aumentarCantidad(id: number){
    this.compra.items = this.compra.items.map((item: Item_compraModel) => {
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
    this.compra.items = this.compra.items.map((item: Item_compraModel) => {
      if (id === item.producto.codigo_producto) {
        item.cantidad_producto--;
      }
      return item;
    })
    this.actualizarTotal();
  }

  eliminarItemFactura(id: number): void {
    this.compra.items = this.compra.items.filter((item: Item_compraModel) => id !== item.producto.codigo_producto);
    this.actualizarTotal();
  }


}
