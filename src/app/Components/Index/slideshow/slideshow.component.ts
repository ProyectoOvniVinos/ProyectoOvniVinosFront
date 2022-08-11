import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/Models/Producto.model';
import Swiper , {Autoplay} from 'swiper';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() productos!: ProductoModel[];

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
        delay: 4000,
        disableOnInteraction: false,
      },
      speed: 800,
    });
    this.swiper.autoplay.start();
  }

  ngOnInit(): void {
  }

  onSlideNext() {
    this.swiper.slideNext();
  }
  onSlidePrev() {
    this.swiper.slidePrev();
  }
}
