import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-datos-cliente',
  templateUrl: './datos-cliente.component.html',
  styleUrls: ['./datos-cliente.component.css']
})
export class DatosClienteComponent implements OnInit {
  
  @Input() modal:boolean = false;

  constructor() { } 

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modal = false;
  }

  abrirModal(){
    this.modal = true;
  }

}
