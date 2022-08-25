import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  validarRuta = false;
  modal: boolean = true;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  getRuta() {


    if (this.router.url == "/catalogo") {
      return true;
    } else {
      return false;
    }
  }

}
