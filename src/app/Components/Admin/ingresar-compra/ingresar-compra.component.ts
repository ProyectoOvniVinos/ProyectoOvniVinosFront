import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CompraModel } from 'src/app/Models/Compra.model';
import { Item_compraModel } from 'src/app/Models/Item_compra.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { AdminService } from 'src/app/Services/admin.service';
import { CompraService } from 'src/app/Services/compra.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';

@Component({
  selector: 'app-ingresar-compra',
  templateUrl: './ingresar-compra.component.html',
  styleUrls: ['./ingresar-compra.component.css']
})
export class IngresarCompraComponent implements OnInit {

  compra = new CompraModel();
  total: number=0;

  itemVaciar = new Item_compraModel();

  productos: ProductoModel[] = [];

  banderaProducto: boolean = false;
  banderaCantidad: boolean = false;
  banderaPrecio: boolean = false;
  compraForm !: FormGroup;
  bandera !: boolean;

  constructor(private fb: FormBuilder, 
              private serviceProducto: ProductoService,
              public dialog: MatDialog, 
              private serviceCompra: CompraService,
              private serviceAdmin: AdminService) {
    this.crearFormulario();
  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }

  ngOnInit(): void {
    this.serviceProducto.getProducts().subscribe((productos: any) => {
      this.productos=productos;
      if(this.productos.length==0){
        this.bandera=false;
      }else{
        this.bandera=true;
      }
    })

  }

  get productoControl(): FormControl{
    return this.compraForm.get('producto') as FormControl
  }
  get cantidadControl(): FormControl{
    return this.compraForm.get('cantidad') as FormControl
  }
  get precioControl(): FormControl{
    return this.compraForm.get('precio') as FormControl
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
      precio: ['',[Validators.required]]
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
      foto_producto: 'img',
    }
    // let producto1 = event.option.value as ProductoModel

    if (this.existeItem(producto.codigo_producto)) {
      this.incrementaCantidad(producto.codigo_producto);
    }else {
      let nuevoItem = new Item_compraModel();
      nuevoItem.cantidad_producto = this.compraForm.controls['cantidad'].value;
      nuevoItem.codigo_producto = producto;
      this.compra.compras.push(nuevoItem);
    }

    this.actualizarTotal()


  }
  existeItem(id: number): boolean {
    let existe = false;
    this.compra.compras.forEach((item: Item_compraModel) => {
      if (id === item.codigo_producto.codigo_producto) {
        existe = true
      }
    });
    return existe;
  }

  actualizarTotal(){
    let total = 0;
    this.compra.compras.forEach((item: Item_compraModel) => {
      total = total + item.calcularImporte();
    })
    this.total=total;
  }

  incrementaCantidad(id: number): void {
    this.compra.compras = this.compra.compras.map((item: Item_compraModel) => {
      if (id === item.codigo_producto.codigo_producto) {
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
    this.compra.compras = this.compra.compras.map((item: Item_compraModel) => {
      if (id === item.codigo_producto.codigo_producto) {
        item.cantidad_producto = cantidad;
      }
      return item;
    });
    this.actualizarTotal();
  }

  aumentarCantidad(id: number){
    this.compra.compras = this.compra.compras.map((item: Item_compraModel) => {
      if (id === item.codigo_producto.codigo_producto) {
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
    this.compra.compras = this.compra.compras.map((item: Item_compraModel) => {
      if (id === item.codigo_producto.codigo_producto) {
        item.cantidad_producto--;
      }
      return item;
    })
    this.actualizarTotal();
  }

  eliminarItemFactura(id: number): void {
    this.compra.compras = this.compra.compras.filter((item: Item_compraModel) => id !== item.codigo_producto.codigo_producto);
    this.actualizarTotal();
  }

  realizarCompra(){
    this.compra.precio_compra=this.total;
    this.compra.cantidad_compra = this.obtenerCantidadTotal()
    console.log(this.compra);
    

    this.serviceCompra.addCompra(this.compra).subscribe(e=>{
      this.openDialog("Exito!!!","Se ha agregado la compra satisfactoriamente!")
      this.vaciar()
    },err => {
      this.openDialog("Error","Ha ocurrido un problema")
      
      
    })
    
  }

  obtenerCantidadTotal(){
    let cantidad: number=0;
    this.compra.compras.forEach((item: Item_compraModel) => {
      cantidad= cantidad + item.cantidad_producto;
    })
    return cantidad;
  }

  vaciar(){
    this.compraForm.reset();
    this.compra.compras=[]
  }

}
