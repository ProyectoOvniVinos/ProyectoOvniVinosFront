import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AdministradorModel } from '../Models/Administrador.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url:string="http://localhost:8080/apiAdmin/";

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getAllAdmins():Observable<AdministradorModel[]> {
    return this.http.get<AdministradorModel[]>(`${this.url}admins`);
  }

  getAdminById(correo: String) {
    return this.http.get<any>(`${this.url}admin/${correo}`)
  }

  getUsuarioById(correo: String) {
    return this.http.get<any>(`${this.url}usuario/${correo}`)
  }



  createAdmin(adminNuevo: AdministradorModel):Observable<any>{

    let url=`${this.url}registro`
    return this.http.post<any>(url, adminNuevo, {headers: this.httpHeaders}).pipe(catchError(e=>{
      if(e.status==500){
        return throwError(e);
      }
      return throwError(e);
    }))

  }

  updateCliente(correo: String, adminNuevo: AdministradorModel){
    const url: string = `${this.url}admin/${correo}`
    return this.http.put<any>(url, adminNuevo, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==500){
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }

  UpdateEstado(correo:string){
    const url: string=`${this.url}admin/estado/${correo}`
    return this.http.put<any>(url, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==500){
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }

}
