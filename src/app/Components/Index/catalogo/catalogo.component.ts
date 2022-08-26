import { ModalProductosComponent } from './../../Modal/modal-productos/modal-productos.component';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModel } from '../../../Models/Producto.model';
import { ProductoService } from '../../../Services/producto.service';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';
import { InventarioGService } from 'src/app/Services/inventario-g.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit, OnChanges {

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
    private inventarioService: InventarioGService) { }
  ngOnChanges() {

    if (this.inventarioGeneral.length == 0) {
      this.banderaErrores = false
      console.log(this.banderaErrores);

    }
  }

  ngOnInit(): void {

    this.obtenerProductos();
    this.clienteService.getByEmail("c@gmail.com").subscribe(resp => {
      this.clienteInp = resp;
    })
  }

  obtenerProductos() {
    this.inventarioGeneral = []
    this.productoService.getProductsInventario().subscribe(inventario => {
      this.inventarioGeneral = inventario;
    }, err => {

    })

  }

  buscar(event) {
    console.log(event.target.value);
    if (event.target.value == "") {
      console.log("AAAAAAAAAAAAAAAAAAAAAAA");

      this.obtenerProductos()
      this.banderaErrores = false
    } else {

      let name: string = event.target.value;
      this.inventarioGeneral = [];
      this.inventarioService.getInventarioGeneralComPositivoNombre(name).subscribe((resp: any) => {

        this.inventarioGeneral = resp;
        console.log(this.inventarioGeneral.length);


        if (this.inventarioGeneral.length == 0) {
          this.error = "No se encontraron productos por ese nombre"
          this.banderaErrores = true

        } else {
          this.banderaErrores = false
        }

      }, err => {
        this.errores = err.error.mensaje
        this.banderaErrores = true
        console.log(this.banderaErrores);
      })
    }

  }

  agregar(producto: ProductoModel) {
    this.clienteService.getByEmail("c@gmail.com").subscribe((resp: ClienteModel) => {
      let flag = false;
      resp.carrito.itemCarrito.forEach(item => {
        if (item.codigoProducto.codigoProducto == producto.codigoProducto) {
          item.cantidadProducto = item.cantidadProducto + 1;
          flag = true;

        }
      })
      if (flag == false) {
        let newItem = new ItemCarritoModel();
        newItem.cantidadProducto = 1;
        newItem.codigoProducto = producto
        newItem.precioItem = producto.precioProducto

        resp.carrito.itemCarrito.push(newItem);
      }


      this.carritoService.actualizarCarrito(resp.carrito).subscribe(resp => {
        this.clienteInp.carrito = resp.carrito;



      })


    })

    this.agrandar = true;
    setTimeout(() => {
      this.agrandar = false;
    }, 1000)
    if (this.validarCarrito) {
      this.recargarCarrito();

    }
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

    dialogRef.afterClosed().subscribe( (result:any) => {
      console.log(result);
      
      if(result.resultado==true){
        
        this.agregar(result.inventarioG.codigoProducto);

      } else {
        console.log("EN ELSE");
        
      }
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

    if(text=="Vidrio" || text=="Plastico"){
      console.log(text);
      
      this.productoService.getProductsEstadoFiltro(text).subscribe(inventario => {
        this.inventarioGeneral = inventario;
      })
    }else if(text=="Destacados"){
      console.log("destacados");
      
      this.inventarioService.getInventarioDestacado().subscribe(inventario => {
        console.log(inventario);
        
        this.inventarioGeneral = inventario
      },err=>{
        console.log(err);
        
      })
    }else{
      console.log(text);

      this.productoService.getProductsInventario().subscribe(inventario => {

        this.inventarioGeneral = inventario;
      })
    }
  }

  mostrarCarrito() {
    this.validarCarrito = !this.validarCarrito;
  }

}
