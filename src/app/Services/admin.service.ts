import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdministradorModel } from '../Models/Administrador.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url:string="http://localhost:8080/apiCliente/";

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getClienteById(){

    let admin: AdministradorModel = {
      correoAdmin: "admin@gmail.com",
      nombreAdmin: "admin",
      apellidoAdmin: "admin",
      direccionAdmin: "admin",
      telefonoAdmin: "1234",
      passwordAdmin: "admin123"
    }

    return admin;
  }

  updateCliente(){

  }
}
