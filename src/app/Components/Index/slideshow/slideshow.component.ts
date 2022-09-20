import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModel } from '../../../Models/Cliente.model';
import { Inventario_generalModel } from '../../../Models/Inventario_general.model';
import { ItemCarritoModel } from '../../../Models/itemCarrito.model';
import { ProductoModel } from '../../../Models/Producto.model';
import { CarritoService } from '../../../Services/carrito.service';
import { ClienteService } from '../../../Services/cliente.service';
import { LoginService } from '../../../Services/login.service';
import Swiper, { Autoplay } from 'swiper';
import { ModalProductosComponent } from '../../Modal/modal-productos/modal-productos.component';
import { InventarioGService } from '../../../Services/inventario-g.service';
import { CarritoClienteModel } from '../../../Models/CarritoCliente.model';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() inventarios!: Inventario_generalModel[];

  @Output() devolver = new EventEmitter<any>();
  public swiper!: Swiper;

  private usuario;

  public cliente: ClienteModel = new ClienteModel();
  constructor(public carritoService: CarritoService, public clienteService: ClienteService, public dialog: MatDialog,
    public loginService: LoginService, private inventarioService: InventarioGService) { }
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      modules: [Autoplay],

      slidesPerView: 1.3,
      grabCursor: true,
      centeredSlides: true,
      spaceBetween: 30,
      autoplay: {
        delay: 3000
      },
      speed: 400,
    });
    this.swiper.autoplay.start();
  }

  openDialog(inventario: Inventario_generalModel): void {
    const pageWidth = document.documentElement.scrollWidth;
    let width = '50%'
    if (pageWidth <= 1400) {
      width = '70%'
    }
    const dialogRef = this.dialog.open(ModalProductosComponent, {
      width: width,
      data: inventario,
    });
    dialogRef.afterClosed().subscribe((result: any) => {

      if(result && result.resultado){

        if (result.resultado == true) {
  
          this.agregar(result.inventarioG.codigoProducto);
  
        } else {
  
        }
      }
    });
  }

  ngOnInit(): void {
  }

  onSlideNext() {
    this.swiper.slideNext();
  }
  onSlidePrev() {
    this.swiper.slidePrev();
  }
  actualizarCarrito(event, producto: ProductoModel) {
    event.stopPropagation();
    this.usuario = this.loginService.usuario;
    this.clienteService.getByEmail(this.usuario.correo).subscribe((resp: ClienteModel) => {
      let flag = false;
      resp.carrito.itemCarrito.forEach(item => {
        if (item.codigoProducto.codigoProducto == producto.codigoProducto) {
          item.cantidadProducto = item.cantidadProducto + 1;
          flag = true;
          this.validarCantidades(item, resp.carrito);

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


  }
  agregar(producto: ProductoModel) {
    event.stopPropagation();
    this.usuario = this.loginService.usuario;
    this.clienteService.getByEmail(this.usuario.correo).subscribe((resp: ClienteModel) => {
      let flag = false;
      resp.carrito.itemCarrito.forEach(item => {
        if (item.codigoProducto.codigoProducto == producto.codigoProducto) {
          item.cantidadProducto = item.cantidadProducto + 1;
          flag = true;
          this.validarCantidades(item, resp.carrito);

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


  }


  validarCantidades(item:ItemCarritoModel,carrito:CarritoClienteModel) {
    let bandera:boolean = false;
    this.inventarioService.getInventarioGeneralByProducto(item.codigoProducto.codigoProducto).subscribe((resp:Inventario_generalModel)=>{
      let cantidadP = resp.cantidadProducto
      
      if(item.cantidadProducto<cantidadP || item.cantidadProducto==cantidadP){
        this.carritoService.actualizarCarrito(carrito).subscribe(resp => {
          this.cliente.carrito = resp.carrito;
          let list: Object = {
            objeto: resp.carrito,
            variable: false
          }
  
          this.devolver.emit(list)
        })
      }else{
        this.openDialog2("ERROR", "Ya añadiste la cantidad existente de este producto.")

      }
    })
  }

  openDialog2(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: {title: titleNew, mensaje: mensajeNew},
    });
  }
}
