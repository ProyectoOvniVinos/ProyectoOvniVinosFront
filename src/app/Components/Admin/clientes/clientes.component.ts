import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../../../Models/Cliente.model';
import { ClienteService } from '../../../Services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes:ClienteModel[];
  bandera: Boolean;
  constructor(public clienteService:ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getAll().subscribe(resp=>{
      this.clientes = resp

      if(this.clientes.length>0){
        this.bandera=true;
      }else{
        this.bandera=false;
      }

    }, err => {
      this.bandera=null;
    })
  }



}

