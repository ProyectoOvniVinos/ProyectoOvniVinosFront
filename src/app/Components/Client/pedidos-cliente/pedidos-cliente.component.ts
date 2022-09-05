import { Component, OnInit } from '@angular/core';
import { PedidoModel } from 'src/app/Models/Pedido.model';
import { LoginService } from 'src/app/Services/login.service';
import { PedidosRestService } from '../../../Services/pedidos-rest.service';

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.css']
})
export class PedidosClienteComponent implements OnInit {

  pedidos: PedidoModel[] = [];

  constructor(private pedidosService:PedidosRestService, private login: LoginService) { }

  ngOnInit(): void {

    this.pedidosService.getPedidosCliente(this.login.usuario.correo).subscribe(pedidos=>{
      this.pedidos = pedidos;
    });

  }

}
