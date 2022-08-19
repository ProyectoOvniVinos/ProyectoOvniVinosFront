import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CarritoClienteModel } from '../Models/CarritoCliente.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  url:string="http://localhost:8080/apiCarrito/";

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  actualizarCarrito(carrito:CarritoClienteModel){
    
    return this.http.put<any>(`${this.url}carrito/${carrito.idCarrito}`,carrito,{headers: this.httpHeaders}).pipe(
        catchError(e => {
  
          if(e.status==500){
            return throwError(e);
          }
  
          return throwError(e);
        })
      );
  }
}
