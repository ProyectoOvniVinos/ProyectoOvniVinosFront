import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { VentaModel } from '../Models/Venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url:string="http://localhost:8080/apiVenta/";

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getVentas():Observable<VentaModel[]>{
    let url: string = `${this.url}ventas`;
    return this.http.get<VentaModel[]>(url);
  }

  getVentaByid(id: number){
    const url: string = `${this.url}venta/${id}`
    return this.http.get(url).pipe(
      catchError(e=>{
        return throwError(e);
      })
    )

  }

  addVenta(venta: VentaModel): Observable<any>{
    const url: string=`${this.url}venta`;
    return this.http.post<any>(url, venta, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  
}
