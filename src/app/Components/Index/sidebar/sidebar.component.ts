import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  abierto = true;
  admin = false;
  cliente = true;
  validarCarrito = false;
  constructor() {

  }

  ngOnInit(): void {
  }

}
