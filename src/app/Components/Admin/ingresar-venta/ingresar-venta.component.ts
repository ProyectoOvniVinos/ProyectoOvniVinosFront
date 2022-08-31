import { Item_ventaModel } from './../../../Models/Item_venta.model';
import { VentaModel } from './../../../Models/Venta.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoModel } from '../../../Models/Producto.model';
import { ProductoService } from '../../../Services/producto.service';
import { ClienteModel } from '../../../Models/Cliente.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { VentaService } from '../../../Services/venta.service';
import { ModalLoadingComponent } from '../../Modal/modal-loading/modal-loading.component';
import { Inventario_generalModel } from '../../../Models/Inventario_general.model';
import { InventarioGService } from '../../../Services/inventario-g.service';
import { ModalInteraccionComponent } from '../../Modal/modal-interaccion/modal-interaccion.component';

@Component({
  selector: 'app-ingresar-venta',
  templateUrl: './ingresar-venta.component.html',
  styleUrls: ['./ingresar-venta.component.css']
})
export class IngresarVentaComponent implements OnInit {

  venta = new VentaModel();
  total: number=0;


  productos: ProductoModel[] = [];

  banderaProducto: boolean = false;
  banderaCantidad: boolean = false;
  banderaPrecio: boolean = false;
  ventaForm !: FormGroup;
  bandera : Boolean;

  cliente:ClienteModel;

  constructor(private fb: FormBuilder, private serviceProducto: ProductoService, public dialog: MatDialog, public serviceVenta: VentaService, private inventarioGService:InventarioGService) {
    this.crearFormulario();
  }

  ngOnInit(): void {

    this.serviceProducto.getProductsInventario().subscribe((productos: Inventario_generalModel[]) => {
      productos.map( inventario => {
        this.productos.push(inventario.codigoProducto)
      } );
      this.bandera=true;
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

  openDialogLoading(){
    const dialogRef = this.dialog.open(ModalLoadingComponent, {
      width: '130px'
    });
  }

  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
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

      this.inventarioGService.getInventarioGeneralByProducto(this.ventaForm.controls['producto'].value).subscribe((resp:Inventario_generalModel)=>{
        if(resp.cantidadProducto!=0){
          if(resp.cantidadProducto>=this.ventaForm.controls['cantidad'].value){
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
          }else{
            this.openDialogInteraction("Advertencia excede cantidad",`El producto tiene ${resp.cantidadProducto} unidades disponibles. ¿Desea agregarlas todas`, resp.cantidadProducto);
            
          }
        }else{
          this.openDialog("Lo sentimos", "No hay existencias de ese producto en el momento")
          this.ventaForm.controls['producto'].reset()
          this.ventaForm.controls['cantidad'].reset()
        }
        
      })
      
    }

  }
  openDialogInteraction(titleNew: string, mensajeNew: string, cantidad:number):void{
    const dialogRef = this.dialog.open(ModalInteraccionComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
    dialogRef.afterClosed().subscribe( (result:boolean) => {
      if(result==true){
        this.ventaForm.controls['cantidad'].setValue(cantidad)
        this.seleccionarProducto()
        
      }else{
        console.log("en else");

      }
    });
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
    this.openDialogLoading();
    this.venta.precioVenta=this.total;
    this.venta.cantidadVenta = this.obtenerCantidadTotal()
    
    this.cliente = new ClienteModel();
    this.cliente.apellidoCliente = "cliente"
    this.cliente.correoCliente = "correoClienteOvni@gmail.com"
    this.cliente.direccionCliente = "cliente"
    this.cliente.nombreCliente = "cliente"
    this.cliente.passwordCliente = "tatiana1004"
    this.cliente.telefonoCliente = "3005208221" 

    this.venta.correoCliente = this.cliente;
    

    this.serviceVenta.addVenta(this.venta).subscribe(e=>{
      this.closeDialogLoading();
      this.openDialog("¡¡ÉXITO!!!","La venta se ha guardado satisfactoriamente. ")
      this.vaciar()

    },err => {
      this.closeDialogLoading();
      this.openDialog("ERROR","Lo sentimos, no se pudo guardar la venta. Inténtalo de nuevo. ")
      this.vaciar()

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

