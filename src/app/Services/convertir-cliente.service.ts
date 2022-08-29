import { Injectable } from '@angular/core';
import { ClienteModel } from '../Models/Cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ConvertirClienteService {

  constructor() { }
  convertir(cliente:ClienteModel):ClienteModel{
    let newCliente:ClienteModel = new ClienteModel();
    newCliente.apellidoCliente = cliente.apellidoCliente;
    newCliente.correoCliente = cliente.correoCliente;
    newCliente.direccionCliente = cliente.direccionCliente;
    newCliente.nombreCliente = cliente.nombreCliente;
    newCliente.telefonoCliente = cliente.telefonoCliente;
    newCliente.passwordCliente = cliente.passwordCliente;
    newCliente.ventas = cliente.ventas;
    return newCliente;
  }
}
