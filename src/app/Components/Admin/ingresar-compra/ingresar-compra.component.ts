import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdministradorModel } from 'src/app/Models/Administrador.model';
import { CompraModel } from 'src/app/Models/Compra.model';
import { Item_compraModel } from 'src/app/Models/Item_compra.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { AdminService } from 'src/app/Services/admin.service';
import { CompraService } from 'src/app/Services/compra.service';
import { ProductoService } from 'src/app/Services/producto.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { ModalLoadingComponent } from '../../Modal/modal-loading/modal-loading.component';

@Component({
  selector: 'app-ingresar-compra',
  templateUrl: './ingresar-compra.component.html',
  styleUrls: ['./ingresar-compra.component.css']
})
export class IngresarCompraComponent implements OnInit {

  compra = new CompraModel();
  total: number = 0;

  itemVaciar = new Item_compraModel();

  productos: ProductoModel[] = [];

  banderaProducto: boolean = false;
  banderaCantidad: boolean = false;
  banderaPrecio: boolean = false;
  compraForm !: FormGroup;
  bandera !: Boolean;

  admin: AdministradorModel;

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
      data: { title: titleNew, mensaje: mensajeNew },
    });
  }

  openDialogLoading(){
    const dialogRef = this.dialog.open(ModalLoadingComponent, {
      width: '130px'
    });
  }

  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
  }

  ngOnInit(): void {
    this.serviceProducto.getProducts().subscribe((productos: any) => {
      this.productos = productos;
      this.bandera= true;

      if (this.productos.length == 0) {
        this.bandera = false;
      } else {
        this.bandera = true;
      }
    })

  }

  get productoControl(): FormControl {
    return this.compraForm.get('producto') as FormControl
  }
  get cantidadControl(): FormControl {
    return this.compraForm.get('cantidad') as FormControl
  }
  get precioControl(): FormControl {
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
      precio: ['', [Validators.required]]
    })
  }


  // Metodos para los items

  seleccionarProducto() {
    let producto2: ProductoModel;
    if (this.compraForm.controls['cantidad'].touched == true && this.compraForm.controls['producto'].touched == true ) {

      this.productos.map(producto => {
        if (producto.codigoProducto == this.compraForm.controls['producto'].value) {
          producto2 = producto;
          producto2.precioProductoProveedor = this.compraForm.controls['precio'].value;
        }
      })
      // let producto1 = event.option.value as ProductoModel


      if (this.existeItem(producto2.codigoProducto)) {
        this.incrementaCantidad(producto2.codigoProducto);
      } else {
        let nuevoItem = new Item_compraModel();
        nuevoItem.cantidadProducto = this.compraForm.controls['cantidad'].value;
        nuevoItem.codigoProducto = producto2;
        this.compra.compras.push(nuevoItem);
      }

      this.actualizarTotal()
    } else {
      this.openDialog("ADVERTENCIA", "Por favor llene todos lo campos. ");
    }
  }
  existeItem(id: number): boolean {
    let existe = false;
    this.compra.compras.forEach((item: Item_compraModel) => {
      if (id === item.codigoProducto.codigoProducto) {
        existe = true
      }
    });
    return existe;
  }

  actualizarTotal() {
    let total = 0;
    this.compra.compras.forEach((item: Item_compraModel) => {
      total = total + item.calcularImporte();
    })
    this.total = total;
  }

  incrementaCantidad(id: number): void {
    this.compra.compras = this.compra.compras.map((item: Item_compraModel) => {
      if (id === item.codigoProducto.codigoProducto) {
        let suma: number = this.compraForm.controls['cantidad'].value;
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
    this.compra.compras = this.compra.compras.map((item: Item_compraModel) => {
      if (id === item.codigoProducto.codigoProducto) {
        item.cantidadProducto = cantidad;
      }
      return item;
    });
    this.actualizarTotal();
  }

  aumentarCantidad(id: number) {
    this.compra.compras = this.compra.compras.map((item: Item_compraModel) => {
      if (id === item.codigoProducto.codigoProducto) {
        item.cantidadProducto++;
      }
      return item;
    })
    this.actualizarTotal();
  }
  disminuirCantidad(id: number, cantidad: number) {
    if (cantidad == 1) {
      this.eliminarItemFactura(id);
    }
    this.compra.compras = this.compra.compras.map((item: Item_compraModel) => {
      if (id === item.codigoProducto.codigoProducto) {
        item.cantidadProducto--;
      }
      return item;
    })
    this.actualizarTotal();
  }

  eliminarItemFactura(id: number): void {
    this.compra.compras = this.compra.compras.filter((item: Item_compraModel) => id !== item.codigoProducto.codigoProducto);
    this.actualizarTotal();
  }

  realizarCompra() {
    this.openDialogLoading();
    this.compra.precioCompra = this.total;
    this.compra.cantidadCompra = this.obtenerCantidadTotal()

    this.admin = new AdministradorModel();
    this.admin.apellidoAdmin = "Amador"
    this.admin.correoAdmin = "cristian@gmail.com"
    this.admin.direccionAdmin = "centenario"
    this.admin.nombreAdmin = "Cristian"
    this.admin.passwordAdmin = "12345"
    this.admin.telefonoAdmin = "323"

    this.compra.administradorCompra = this.admin;
    console.log(this.compra);


    this.serviceCompra.addCompra(this.compra).subscribe(e => {
      this.closeDialogLoading();
      this.openDialog("¡¡ÉXITO!!!", "La compra se ha agregado satisfactoriamente. ")
      this.vaciar()

    }, err => {
      this.openDialog("ERROR", "Lo sentimos, no se pudo agregar la compra. Inténtalo de nuevo. ")

      this.closeDialogLoading();
      this.openDialog("Exito!!!", "Se ha agregado la compra satisfactoriamente!")
      this.vaciar()
    })

  }

  mirar() {
    if (this.compraForm.controls['producto'].value) {

      this.productos.map(producto => {
        if (producto.codigoProducto == this.compraForm.controls['producto'].value) {
          this.compraForm.controls['precio'].setValue(producto.precioProducto);
        }
      })
    }
  }

  obtenerCantidadTotal() {
    let cantidad: number = 0;
    this.compra.compras.forEach((item: Item_compraModel) => {
      cantidad = cantidad + item.cantidadProducto;
    })
    return cantidad;
  }

  vaciar() {
    this.compraForm.reset();
    this.compra.compras = []
    this.total = 0;
  }

}
