import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../Models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url:string="http://localhost:8080/apiProd/";

  constructor(private http: HttpClient) { }

  getProducts():Observable<ProductoModel[]> {
    const url: string = `${this.url}productos`

    return this.http.get<ProductoModel[]>(url);
  }

  getProductById(id){

    const url: string = `${this.url}producto/${id}`

    return this.http.get(url);
  }

  getProductByName(){

  }

  createProduct(producto: ProductoModel){
    const url: string = `${this.url}producto}`

  }

  updateProduct(){

  }

  deleteProduct(){

  }

}
