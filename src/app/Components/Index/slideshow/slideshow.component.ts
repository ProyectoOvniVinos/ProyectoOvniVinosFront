import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import Swiper , {Autoplay} from 'swiper';
import { ModalProductosComponent } from '../../Modal/modal-productos/modal-productos.component';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() inventarios!: Inventario_generalModel[];

  @Output() devolver = new EventEmitter<any>();
  public swiper!: Swiper;

  public cliente:ClienteModel = new ClienteModel();
  constructor(public carritoService:CarritoService, public clienteService:ClienteService, public dialog: MatDialog) { }
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
    const pageWidth  = document.documentElement.scrollWidth;
    let width='50%'
    if(pageWidth<=1400){
        width='70%'
    }
    const dialogRef = this.dialog.open(ModalProductosComponent, {
      width: width,
      data: inventario,
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

  ngOnInit(): void {
  }

  onSlideNext() {
    this.swiper.slideNext();
  }
  onSlidePrev() {
    this.swiper.slidePrev();
  }
  actualizarCarrito(event, producto: ProductoModel){
    event.stopPropagation();
    this.clienteService.getByEmail("c@gmail.com").subscribe((resp:ClienteModel)=>{
      let flag = false;
      resp.carrito.itemCarrito.forEach(item=>{
        if(item.codigoProducto.codigoProducto == producto.codigoProducto){
          item.cantidadProducto = item.cantidadProducto+1;
          flag=true;
          
        }
      })
      if(flag==false){
        let newItem = new ItemCarritoModel();
        newItem.cantidadProducto = 1;
        newItem.codigoProducto = producto
        newItem.precioItem = producto.precioProducto
  
        resp.carrito.itemCarrito.push(newItem);
      }

      
      
      this.carritoService.actualizarCarrito(resp.carrito).subscribe(resp=>{
        this.cliente.carrito = resp.carrito;
        let list:Object={
          objeto:resp.carrito,
          variable:false
        }
        this.devolver.emit(list)
        
      })
      
      
    })
        
    
  }
  agregar( producto: ProductoModel){
    event.stopPropagation();
    this.clienteService.getByEmail("c@gmail.com").subscribe((resp:ClienteModel)=>{
      let flag = false;
      resp.carrito.itemCarrito.forEach(item=>{
        if(item.codigoProducto.codigoProducto == producto.codigoProducto){
          item.cantidadProducto = item.cantidadProducto+1;
          flag=true;
          
        }
      })
      if(flag==false){
        let newItem = new ItemCarritoModel();
        newItem.cantidadProducto = 1;
        newItem.codigoProducto = producto
        newItem.precioItem = producto.precioProducto
  
        resp.carrito.itemCarrito.push(newItem);
      }
      
      
      this.carritoService.actualizarCarrito(resp.carrito).subscribe(resp=>{
        this.cliente.carrito = resp.carrito;
        let list:Object={
          objeto:resp.carrito,
          variable:false
        }
    
        this.devolver.emit(list)
        
      })
      
      
    })
        
    
  }
}
