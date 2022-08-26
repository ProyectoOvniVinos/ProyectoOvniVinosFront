import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ClienteModel } from '../Models/Cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url:string="http://localhost:8080/apiCliente/";

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }
  registro(cliente:ClienteModel): Observable<any>{
    console.log(cliente);
    
    return this.http.post<any>(`${this.url}registro`, cliente, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {

        if(e.status==500){
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }
  getAll(){
    return this.http.get<any>(`${this.url}clientes`);
  }
  getByEmail(email:String){
    return this.http.get<any>(`${this.url}cliente/${email}`);
  }

  recuperarPassword(url:String,correoEncrypt:string){
    let data:any={
      url:url,
      correoEncrypt:correoEncrypt,
      correo:this.desencriptar(correoEncrypt)
    }
    return this.http.post<any>(`${this.url}recuperar`, data, {headers: this.httpHeaders})
  }
  desencriptar(correo:string){
    let desencriptado = atob(correo)
    return desencriptado;
  }
  actualizar(cliente:ClienteModel){
    let clienteNew = new ClienteModel()
    clienteNew.apellidoCliente=cliente.apellidoCliente
    clienteNew.nombreCliente=cliente.nombreCliente
    clienteNew.direccionCliente=cliente.direccionCliente
    clienteNew.passwordCliente=cliente.passwordCliente
    clienteNew.telefonoCliente=cliente.telefonoCliente
    clienteNew.correoCliente=cliente.correoCliente
    return this.http.put<any>(`${this.url}cliente/${clienteNew.correoCliente}`,clienteNew,{headers: this.httpHeaders})
  }
}
