import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventario_generalModel } from '../Models/Inventario_general.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  url:string="http://localhost:8080/apiInventario/";

  constructor(private http: HttpClient) { }

  getInventarioGeneral():Observable<Inventario_generalModel[]> {
    const url: string = `${this.url}inventarioGeneralCompleto`

    return this.http.get<Inventario_generalModel[]>(url);
  }

  getInventarioGeneralId(id:number):Observable<Inventario_generalModel> {
    const url: string = `${this.url}inventarioGeneralId/${id}`

    return this.http.get<Inventario_generalModel>(url);
  }

  getProducts(producto:number):Observable<Inventario_generalModel> {
    const url: string = `${this.url}inventarioGeneralProducto/${producto}`

    return this.http.get<Inventario_generalModel>(url);
  }
}
