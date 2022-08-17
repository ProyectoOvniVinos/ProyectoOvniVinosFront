import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { ProductoModel } from 'src/app/Models/Producto.model';
import Swiper , {Autoplay} from 'swiper';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() inventarios!: Inventario_generalModel[];

  public swiper!: Swiper;

  constructor() { }
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

  click(){
    console.log(this.inventarios);
  }
}
