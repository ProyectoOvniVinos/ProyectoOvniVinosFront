import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'src/app/Services/dark-mode.service';
import { LoginService } from '../../../Services/login.service';

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
  banderaSwitch: boolean;
  titleSwitch:string;

  constructor(private router: Router, public loginService: LoginService, public darkModeService: DarkModeService) {

  }

  ngOnInit(): void {
    this.titleSwitch="Noche"
  }

  getRuta() {
    if (this.router.url == "/catalogo") {
      return true;
    } else {
      return false;
    }
  }
  salir(event){
    event.stopPropagation();
    this.loginService.logout();
    this.router.navigate(['/catalogo']);
  }
  cambiarMode(){

    if(document.body.classList.value == "darkMode"){
      document.body.classList.remove('darkMode');
      this.darkModeService.guardarBandera("false");
      this.banderaSwitch=false;
      this.titleSwitch="Noche"
    }else{
      document.body.classList.add("darkMode");
      this.darkModeService.guardarBandera("true");
      this.banderaSwitch=true;
      this.titleSwitch="Dia"
    }
  }

}
