import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ProductoModel } from '../Models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url:string="http://localhost:8080/apiProd/";

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getProducts():Observable<ProductoModel[]> {
    const url: string = `${this.url}productos`
    return this.http.get<ProductoModel[]>(url);
  }

  getProductById(id: number){

    const url: string = `${this.url}producto/${id}`

    return this.http.get(url);
  }

  getProductByName(name: string):Observable<ProductoModel[]>{
    const url: string = `${this.url}productoNombre/${name}`
    return this.http.get<ProductoModel[]>(url).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  createProduct(producto: ProductoModel): Observable<any>{
    const url: string = `${this.url}producto`
    return this.http.post<any>(url, producto, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==500){
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }

  updateProduct(id:number, producto: ProductoModel){
    const url: string = `${this.url}producto/${id}`
    return this.http.put<any>(url, producto, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==500){
          return throwError(e);
        }

        return throwError(e);
      })
    );
  }

  inhabilitarProduct(){

  }

  habilitarProduct(){
    
  }

}
