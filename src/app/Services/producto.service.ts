import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { actionToJson } from '@cloudinary/url-gen/internal/models/actionToJson';
import { catchError, Observable, throwError } from 'rxjs';
import { Inventario_generalModel } from '../Models/Inventario_general.model';
import { ProductoModel } from '../Models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url:string="http://localhost:8080/apiProd/";

  url2:string="http://localhost:8080/apiInventario/inventarioGeneralCompleto/positvo";

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


  getProductsEstado():Observable<ProductoModel[]> {
    const url: string = `${this.url}producto/estado`
    return this.http.get<ProductoModel[]>(url);
  }

  getProductsEstadoFiltro(filtro:string):Observable<Inventario_generalModel[]> {
    const url: string = `${this.url2}Filtrado/${filtro}`;

    return this.http.get<Inventario_generalModel[]>(url);
  }

  getProductsInventario():Observable<Inventario_generalModel[]> {
    return this.http.get<Inventario_generalModel[]>(this.url2);
  }

  deshabilitarProduct(id:number){
    const url: string=`${this.url}producto/estado/${id}`
    return this.http.put<any>(url, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }
}
