import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  abierto = true;
  admin = false;
  cliente = false;
  validarCarrito = false;
  modal:boolean = true;

  constructor() {

  }

  ngOnInit(): void {
  }

}
