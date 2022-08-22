import { ProductoModel } from 'src/app/Models/Producto.model';
import { DialogData } from './../DialogData';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { ClienteService } from 'src/app/Services/cliente.service';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ItemCarritoModel } from 'src/app/Models/itemCarrito.model';
import Swiper, { Autoplay } from 'swiper';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.css']
})
export class ModalProductosComponent implements OnInit {

  public swiper!: Swiper
  productoRecomendado: ProductoModel;
  productos: ProductoModel[] = [];

  constructor(private productoService: ProductoService,
    public dialogRef: MatDialogRef<ModalProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public inventario:Inventario_generalModel,
    public clienteService:ClienteService,
    public carritoService:CarritoService){}

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      modules: [Autoplay],

      slidesPerView: 1,
      grabCursor: true,
      centeredSlides: false,
      autoplay: {
        delay: 4000
      },
      speed: 400,
    });
  }

  onSlideNext() {
    this.swiper.slideNext();
  }
  onSlidePrev() {
    this.swiper.slidePrev();
  }
   

  onNoClick(): void{
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.inventario);
    
  }
  

}
