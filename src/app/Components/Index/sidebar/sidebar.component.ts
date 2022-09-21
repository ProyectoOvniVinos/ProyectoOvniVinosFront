import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoModel } from '../../../Models/Pedido.model';
import { DarkModeService } from '../../../Services/dark-mode.service';
import { PedidosRestService } from '../../../Services/pedidos-rest.service';
import { SocketPedidoService } from '../../../Services/socket-pedido.service';
import { LoginService } from '../../../Services/login.service';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebar= "over";
  abierto = true;
  cliente = false;
  admin = false;
  validarCarrito = false;
  validarRuta = false;
  modal: boolean = true;
  banderaSwitch: boolean;
  titleSwitch:string;
  pedidosPendientes: PedidoModel[]=[];
  pedidosProceso: PedidoModel[]=[];

  constructor(private router: Router, 
    public loginService: LoginService, 
    public darkModeService: DarkModeService, 
    private pedidoService: PedidosRestService,
    public pedidoSocket: SocketPedidoService) {

  }

  ngOnInit(): void {
    const width =document.documentElement.scrollWidth;
    if(width < 500) {
      console.log("AAAAAAAAAAAAAAAAAA");
      
      this.sidebar="over";
    }else{
      console.log("BBBBBBBBBBBBBBBB");
      this.sidebar="side";
    }
    this.titleSwitch="Noche"
    if(this.loginService.isAuthenticated()){
      this.pedidoSocket.conectar();
    }
    this.pedidoSocket.conectando();
    
    /* if(this.loginService.hasRole('ROLE_ADMIN')){
      this.pedidoService.getPedidosPendientes().subscribe(
        pedidos => {
          this.pedidosPendientes = pedidos;
        }
      );
      this.pedidoService.getPedidosProceso().subscribe(
        pedidos => {
          this.pedidosProceso = pedidos;
        }
      );
    } */
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
    this.pedidoSocket.desconectar();
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

  peticion(){
    this.pedidoSocket.actualizarPedidos();
  }

}
