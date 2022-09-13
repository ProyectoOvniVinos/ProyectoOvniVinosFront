import { ModalProductosComponent } from './../../Modal/modal-productos/modal-productos.component';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModel } from '../../../Models/Producto.model';
import { ProductoService } from '../../../Services/producto.service';
import { Inventario_generalModel } from '../../../Models/Inventario_general.model';
import { CarritoService } from '../../../Services/carrito.service';
import { ClienteService } from '../../../Services/cliente.service';
import { ClienteModel } from '../../../Models/Cliente.model';
import { ItemCarritoModel } from '../../../Models/itemCarrito.model';
import { InventarioGService } from '../../../Services/inventario-g.service';
import { LoginService } from '../../../Services/login.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit, OnChanges {



  private usuario;
  bandera: boolean=false;

  inventarioGeneral: Inventario_generalModel[] = [];
  validarCarrito = false;
  agrandar = false;
  eliminar = false;
  errores: string[];
  error: string;
  clienteInp: ClienteModel;
  banderaErrores: boolean = false;
  constructor(public dialog: MatDialog,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private clienteService: ClienteService,
    private inventarioService: InventarioGService,
    public loginService: LoginService) { }
  ngOnChanges() {
    if (this.inventarioGeneral.length == 0) {
      this.banderaErrores = false

    }
  }

  ngOnInit(): void {
/*     const width =document.documentElement.scrollWidth;
    if(width > 921) {
      this.banderaWidth=true;
    }else{
      this.banderaWidth=false;
    } */
    this.obtenerProductos();
    this.usuario = this.loginService.usuario;
    if (this.loginService.isAuthenticated() && this.loginService.hasRole('ROLE_CLIENTE')) {


      this.clienteService.getByEmail(this.usuario.correo).subscribe(resp => {
        this.clienteInp = resp;
      })
    }

  }

  obtenerProductos() {
    this.inventarioGeneral = []
    this.productoService.getProductsInventario().subscribe(inventario => {
      this.inventarioGeneral = inventario;
    }, err => {

    })

  }

  buscar(event) {    
    
    if (event.target.value == "") {

      this.obtenerProductos()
      this.banderaErrores = false
    } else {

      let name: string = event.target.value;

      this.inventarioGeneral = [];
      this.inventarioService.getInventarioGeneralComPositivoNombre(name).subscribe((resp: any) => {

        this.inventarioGeneral = resp;


        if (this.inventarioGeneral.length == 0) {
          this.error = "Lo sentimos, no se encontraron productos por ese nombre."
          this.banderaErrores = true

        } else {
          this.banderaErrores = false
        }

      }, err => {
        this.errores = err.error.mensaje
        this.banderaErrores = true
      })
    }

  }


  buscarPorBoton(event) {    
    
    if (event.value == "") {

      this.obtenerProductos()
      this.banderaErrores = false
    } else {

      let name: string = event.value;

      this.inventarioGeneral = [];
      this.inventarioService.getInventarioGeneralComPositivoNombre(name).subscribe((resp: any) => {

        this.inventarioGeneral = resp;


        if (this.inventarioGeneral.length == 0) {
          this.error = "Lo sentimos, no se encontraron productos por ese nombre."
          this.banderaErrores = true

        } else {
          this.banderaErrores = false
        }

      }, err => {
        this.errores = err.error.mensaje
        this.banderaErrores = true
      })
    }

  }

  agregar(producto: ProductoModel) {
    this.usuario = this.loginService.usuario;
    this.clienteService.getByEmail(this.usuario.correo).subscribe((resp: ClienteModel) => {
      let flag = false;
      resp.carrito.itemCarrito.forEach(item => {
        if (item.codigoProducto.codigoProducto == producto.codigoProducto) {
          item.cantidadProducto = item.cantidadProducto + 1;
          this.validarCantidades(item, resp.carrito);
          
          flag = true;

        }
      })
      if (flag == false) {
        let newItem = new ItemCarritoModel();
        newItem.cantidadProducto = 1;
        newItem.codigoProducto = producto
        newItem.precioItem = producto.precioProducto

        resp.carrito.itemCarrito.push(newItem);
        this.validarCantidades(newItem, resp.carrito);
      }
    })

    this.agrandar = true;
    setTimeout(() => {
      this.agrandar = false;
    }, 1000)
    if (this.validarCarrito) {
      this.recargarCarrito();

    }
  }

  validarCantidades(item:ItemCarritoModel,carrito:CarritoClienteModel) {
    let bandera:boolean = false;
    this.inventarioService.getInventarioGeneralByProducto(item.codigoProducto.codigoProducto).subscribe((resp:Inventario_generalModel)=>{
      let cantidadP = resp.cantidadProducto
      
      if(item.cantidadProducto<cantidadP || item.cantidadProducto==cantidadP){
        this.carritoService.actualizarCarrito(carrito).subscribe(resp => {
          this.clienteInp.carrito = resp.carrito;
        })
      }else{
        this.openDialog2("ERROR", "Ya añadiste la cantidad existente de este producto.")

      }
    })
  }

  recargarCarrito() {
    this.validarCarrito = false;
    setTimeout(() => {
      this.validarCarrito = true;
    }, 50)
  }
  openDialog(inventario: Inventario_generalModel): void {
    const pageWidth = document.documentElement.scrollWidth;
    let width = '50%'
    if (pageWidth <= 1400) {
      width = '70%'
    }
    const dialogRef = this.dialog.open(ModalProductosComponent, {
      width: width,
      data: inventario
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result.resultado == true) {

        this.agregar(result.inventarioG.codigoProducto);

      } else {

      }
    });
  }

  openDialog2(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }


  procesarDevolver(mensaje: any) {
    this.agrandar = true;
    setTimeout(() => {
      this.agrandar = false;
    }, 1000)
    this.clienteInp.carrito = mensaje.objeto;
    if (this.validarCarrito && mensaje.variable == false) {

      this.recargarCarrito();
    }

    if (mensaje.banderaCarrito == true) {
      this.obtenerProductos();
    }


  }
  filtro(text: string) {
    this.inventarioGeneral = [];

    if (text == "Vidrio" || text == "Plastico") {

      this.productoService.getProductsEstadoFiltro(text).subscribe(inventario => {
        this.inventarioGeneral = inventario;
      })
    } else if (text == "Destacados") {

      this.inventarioService.getInventarioDestacado().subscribe(inventario => {

        this.inventarioGeneral = inventario
      }, err => {

      })
    
    }else{

      this.productoService.getProductsInventario().subscribe(inventario => {

        this.inventarioGeneral = inventario;
      })
    }
  }

  mostrarCarrito() {
    this.validarCarrito = !this.validarCarrito;
  }


  entrarMenu(){
    this.bandera=true;
  }

  salirMenu(){
    this.bandera=false;
  }

}
