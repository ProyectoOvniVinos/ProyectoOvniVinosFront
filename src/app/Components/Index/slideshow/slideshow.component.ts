import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/Models/Producto.model';
import Swiper from 'swiper';
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

      slidesPerView: 1.3,
      grabCursor: true,
      centeredSlides: true,
      freeMode: true,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      speed: 400,
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
