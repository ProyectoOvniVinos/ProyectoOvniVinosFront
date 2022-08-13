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
      correo_admin: "admin@gmail.com",
      nombre_admin: "admin",
      apellido_admin: "admin",
      direccion_admin: "admin",
      telefono_admin: "1234",
      password_admin: "admin123",
    }

    return admin;
  }

  updateCliente(){

  }
}
