import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  cliente:ClienteModel;
  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getByEmail("c@gmail.com").subscribe(resp=>{
      
      this.cliente = resp;
      
    })
  }

}
