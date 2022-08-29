import { Component, OnInit, Input } from '@angular/core';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ClienteService } from 'src/app/Services/cliente.service';
import { LoginService } from 'src/app/Services/login.service';

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
