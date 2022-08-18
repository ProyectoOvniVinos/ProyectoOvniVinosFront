import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { CarritoService } from 'src/app/Services/carrito.service';
import Swiper , {Autoplay} from 'swiper';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() inventarios!: Inventario_generalModel[];

  public swiper!: Swiper;

  public cliente:ClienteModel = new ClienteModel();

  constructor(public carritoService:CarritoService) { }
  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      modules: [Autoplay],

      slidesPerView: 1.3,
      grabCursor: true,
      centeredSlides: true,
      freeMode: true,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 800,
    });
    this.swiper.autoplay.start();
  }

  ngOnInit(): void {
    console.log(this.inventarios);
  }

  onSlideNext() {
    this.swiper.slideNext();
  }
  onSlidePrev() {
    this.swiper.slidePrev();
  }
  actualizarCarrito(producto: ProductoModel){
    let item = new ItemCarritoModel();
    item.codigoProducto = producto;
    item.cantidadProducto = 1;
    item.precioItem = producto.precioProducto;
    console.log(this.cliente.carrito);
    
    if(this.cliente.carrito===null){
      let carrito = new CarritoClienteModel();
      this.cliente.carrito = carrito;
      this.cliente.carrito.itemCarrito.push(item);
    }else{
      this.cliente.carrito.itemCarrito.push(item);
    }
    this.carritoService.actualizarCarrito(this.cliente.carrito).subscribe(resp => {
      console.log(resp);
    })
    
  }
}
