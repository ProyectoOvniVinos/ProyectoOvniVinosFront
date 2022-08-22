import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:ClienteModel[];
  constructor(public clienteService:ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(resp=>{
      console.log(resp);
      
      this.clientes = resp
    })
  }



}
