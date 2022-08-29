import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AdministradorModel } from '../Models/Administrador.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url: string = "http://localhost:8080/apiAdmin/";

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  getAllAdmins(): Observable<AdministradorModel[]> {
    return this.http.get<AdministradorModel[]>(`${this.url}admins`);
  }

  getAdminById(correo: String) {
    return this.http.get<any>(`${this.url}admin/${correo}`)
  }

  getUsuarioById(correo: String) {
    return this.http.get<any>(`${this.url}usuario/${correo}`)
  }



  createAdmin(adminNuevo: AdministradorModel): Observable<any> {

    let url = `${this.url}registro`
    return this.http.post<any>(url, adminNuevo, { headers: this.httpHeaders }).pipe(catchError(e => {
      if (e.status == 500) {
        return throwError(e);
      }
      return throwError(e);
    }))

  }

  updateAdmin(correo: String, adminNuevo: AdministradorModel) {
    let newAdmin = new AdministradorModel()
    newAdmin.apellidoAdmin = adminNuevo.apellidoAdmin
    newAdmin.correoAdmin = adminNuevo.correoAdmin
    newAdmin.direccionAdmin = adminNuevo.direccionAdmin
    newAdmin.estado = adminNuevo.estado
    newAdmin.nombreAdmin = adminNuevo.nombreAdmin
    newAdmin.passwordAdmin = adminNuevo.passwordAdmin
    newAdmin.telefonoAdmin = adminNuevo.telefonoAdmin

    const url: string = `${this.url}admin/${correo}`

    console.log(url);

    return this.http.put<any>(url, newAdmin, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 500) {
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }

  UpdateEstado(correo: string) {
    const url: string = `${this.url}admin/estado/${correo}`
    return this.http.put<any>(url, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 500) {
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }

}
