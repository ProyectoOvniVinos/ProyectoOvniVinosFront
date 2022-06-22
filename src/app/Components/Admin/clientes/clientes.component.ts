import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clientes: any = [
    {
      correo_cliente: "ivanhshs1@gmail.com",
      nombre_cliente: 'ivan Daniel',
      apellido_cliente: 'Hincapie',
      direccion_cliente: 'cra 27',
      celular_cliente: '3124563539',
    }, {
      correo_cliente: "felipe64@gmail.com",
      nombre_cliente: 'felipe',
      apellido_cliente: 'Sanchez',
      direccion_cliente: 'cra 17',
      celular_cliente: '3034452011',
    }, {
      correo_cliente: "camilo1234@gmail.com",
      nombre_cliente: 'Camilo ',
      apellido_cliente: 'Gomez',
      direccion_cliente: 'cra 10',
      celular_cliente: '3114587020',
    },
  ];


}
