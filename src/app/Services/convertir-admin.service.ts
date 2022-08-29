import { Injectable } from '@angular/core';
import { AdministradorModel } from '../Models/Administrador.model';

@Injectable({
  providedIn: 'root'
})
export class ConvertirAdminService {

  constructor() { }

  convertir(admin:AdministradorModel):AdministradorModel{
    let newAdmin:AdministradorModel = new AdministradorModel();
    newAdmin.apellidoAdmin = admin.apellidoAdmin;
    newAdmin.correoAdmin = admin.correoAdmin;
    newAdmin.direccionAdmin = admin.direccionAdmin;
    newAdmin.estado = admin.estado;
    newAdmin.nombreAdmin = admin.nombreAdmin;
    newAdmin.passwordAdmin = admin.passwordAdmin;
    newAdmin.telefonoAdmin = admin.telefonoAdmin;
    newAdmin.compras = admin.compras;
    return newAdmin;
  }
}
