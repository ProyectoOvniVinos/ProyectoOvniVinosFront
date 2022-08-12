import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CompraModel } from '../Models/Compra.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  url:string="http://localhost:8080/apiCompra/";

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getCompras():Observable<CompraModel[]>{
    let url: string = `${this.url}compras`;
    return this.http.get<CompraModel[]>(url);
  }

  getCompraByid(id: number){
    const url: string = `${this.url}compra/${id}`
    return this.http.get(url).pipe(
      catchError(e=>{
        return throwError(e);
      })
    )

  }

  addCompra(compra: CompraModel): Observable<any>{
    const url: string=`${this.url}registro`;
    return this.http.post<any>(url, compra, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  
}
