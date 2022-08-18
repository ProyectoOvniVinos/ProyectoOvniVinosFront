import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteService } from 'src/app/Services/cliente.service';
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

  constructor(public carritoService:CarritoService, public clienteService:ClienteService) { }
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
        delay: 3000
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
    console.log("AAAAAAAAA");
    
    this.clienteService.getByEmail("c@gmail.com").subscribe((resp:ClienteModel)=>{
      let newItem = new ItemCarritoModel();
      newItem.cantidadProducto = 1;
      newItem.codigoProducto = producto
      newItem.precioItem = producto.precioProducto

      resp.carrito.itemCarrito.push(newItem);
      this.carritoService.actualizarCarrito(resp.carrito).subscribe(resp=>{
        console.log(resp);
        
      })
      
      
    })
    
  }
}
