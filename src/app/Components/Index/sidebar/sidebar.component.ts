import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  abierto = true;
  cliente = false;
  admin = false;
  validarCarrito = false;
  validarRuta = false;
  modal: boolean = true;

  constructor(private router: Router, public loginService: LoginService) {

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

  salir(){
    this.loginService.logout();
    this.router.navigate(['/catalogo']);
  }

}
