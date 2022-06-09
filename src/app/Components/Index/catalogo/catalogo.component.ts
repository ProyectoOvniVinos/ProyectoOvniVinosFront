import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/Models/Producto.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  productos !: ProductoModel[];
  constructor() { }

  ngOnInit(): void {
  }

}
