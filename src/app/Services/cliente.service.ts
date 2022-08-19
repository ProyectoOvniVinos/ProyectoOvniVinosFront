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
    
    console.log("ZZZZZZZZZZZZZZ");
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
}
