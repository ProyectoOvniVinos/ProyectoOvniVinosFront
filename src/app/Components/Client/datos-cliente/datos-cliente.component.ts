import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../../../Models/Cliente.model';
import { ClienteService } from '../../../Services/cliente.service';
import { LoginService } from '../../../Services/login.service';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.css']
})
export class DatosClienteComponent implements OnInit {

  cliente:ClienteModel;
  usuario;

  constructor(private clienteService:ClienteService,  private loginService:LoginService) { 
    
  }

  ngOnInit(): void {
    this.usuario = this.loginService.usuario;
    this.clienteService.getByEmail(this.usuario.correo).subscribe(cliente=>{
      this.cliente = cliente;
    });
  }


}
