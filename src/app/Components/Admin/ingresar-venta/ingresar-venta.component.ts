import { Item_ventaModel } from './../../../Models/Item_venta.model';
import { VentaModel } from './../../../Models/Venta.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item_compraModel } from 'src/app/Models/Item_compra.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { ProductoService } from 'src/app/Services/producto.service';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { VentaService } from 'src/app/Services/venta.service';

@Component({
  selector: 'app-ingresar-venta',
  templateUrl: './ingresar-venta.component.html',
  styleUrls: ['./ingresar-venta.component.css']
})
export class IngresarVentaComponent implements OnInit {

  venta = new VentaModel();
  total: number=0;

  productos: ProductoModel[];

  banderaProducto: boolean = false;
  banderaCantidad: boolean = false;
  banderaPrecio: boolean = false;
  ventaForm !: FormGroup;
  bandera !: boolean;

  cliente:ClienteModel;

  constructor(private fb: FormBuilder, private serviceProducto: ProductoService, public dialog: MatDialog, public serviceVenta: VentaService) {
    this.crearFormulario();
  }

  ngOnInit(): void {

    this.serviceProducto.getProducts().subscribe((productos: any) => {
      this.productos=productos;
      console.log(productos);
      
      if(this.productos.length==0){
        this.bandera=false;
      }else{
        this.bandera=true;
      }
    })
  }

  openDialog(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
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

  crearFormulario() {
    this.ventaForm = this.fb.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]]
    })
  }


  // Metodos para los items
  seleccionarProducto() {
    let producto2: ProductoModel;
    if( this.ventaForm.controls['producto'].touched==true && this.ventaForm.controls['cantidad'].touched==true){

      this.productos.map(producto=>{
        if(producto.codigoProducto == this.ventaForm.controls['producto'].value){
          

          
          producto2 = producto;
          producto2.precioProducto = producto.precioProducto;
        }
      })
      // let producto1 = event.option.value as ProductoModel
  
      
      if (this.existeItem(producto2.codigoProducto)) {
        this.incrementaCantidad(producto2.codigoProducto);
      }else {
        let nuevoItem = new Item_ventaModel();
        nuevoItem.cantidadProducto = this.ventaForm.controls['cantidad'].value;
        nuevoItem.codigoProducto = producto2;
        this.venta.ventas.push(nuevoItem);
      }
  
      this.actualizarTotal()
    }

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

  realizarVenta(){
    this.venta.precioVenta=this.total;
    this.venta.cantidadVenta = this.obtenerCantidadTotal()
    
    this.cliente = new ClienteModel();
    this.cliente.apellidoCliente = "cliente"
    this.cliente.correoCliente = "correoClienteOvni@gmail.com"
    this.cliente.direccionCliente = "cliente"
    this.cliente.nombreCliente = "cliente"
    this.cliente.passwordCliente = "12345"
    this.cliente.telefonoCliente = "323" 

    this.venta.correoCliente = this.cliente;
    console.log(this.venta);
    

    this.serviceVenta.addVenta(this.venta).subscribe(e=>{
      this.openDialog("Exito!!!","Se ha agregado la compra satisfactoriamente!")
      this.vaciar()

    },err => {
      this.openDialog("Error","Ha ocurrido un problema")

      
    })
    
  }
  obtenerCantidadTotal(){
    let cantidad: number=0;
    this.venta.ventas.forEach((item: Item_ventaModel) => {
      cantidad= cantidad + item.cantidadProducto;
    })
    return cantidad;
  }

  vaciar(){
    this.ventaForm.reset();
    this.venta.ventas=[];
    this.total=0;
  }
}
