import { Inventario_generalModel } from './../Models/Inventario_general.model';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventario_detallesModel } from '../Models/Inventario_detalles.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from '../Components/Modal/modal-error/modal-error.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InventarioGService {

  
  url:string="https://ovnivinos.herokuapp.com/apiInventario/";

  constructor(private http: HttpClient, public dialog: MatDialog, private router: Router) { }

  getInventarioGeneralCompleto(): Observable<Inventario_generalModel[]>{
    let url: string = `${this.url}inventarioGeneralCompleto`;
    return this.http.get<Inventario_generalModel[]>(url);
  }

  getInventarioDetallesCompleto(): Observable<Inventario_detallesModel[]>{
    let url: string = `${this.url}inventarioDetallesCompleto`;
    return this.http.get<Inventario_detallesModel[]>(url);
  }

  getInventarioGeneralById(id: number){
    let url: string = `${this.url}inventarioGeneralId/${id}`
    return this.http.get(url).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  getInventarioDetallesById(id: number){
    let url: string = `${this.url}inventarioDetallesId/${id}`
    return this.http.get(url).pipe(
      catchError(e => {
        return throwError(e);
      })
    )
  }

  getInventarioGeneralByProducto(producto: number){
    let url: string = `${this.url}inventarioGeneralProducto/${producto}`
    return this.http.get(url)
  }

  getInventarioGeneralComCantidad():Observable<Inventario_generalModel[]>{
    let url: string = `${this.url}inventarioGeneralCompleto/cantidad`
    return this.http.get<Inventario_generalModel[]>(url);
  }

  getInventarioGeneralComPositivo():Observable<Inventario_generalModel[]>{
    let url: string = `${this.url}inventarioGeneralCompleto/positvo`
    return this.http.get<Inventario_generalModel[]>(url);
  }

  getInventarioGeneralComPositivoNombre(name: string):Observable<Inventario_generalModel[]>{
    const url: string = `${this.url}inventarioGeneralCompleto/positvoFiltradoNombre/${name}`
    return this.http.get<Inventario_generalModel[]>(url).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  getInventarioDestacado():Observable<Inventario_generalModel[]>{
    const url: string= `${this.url}inventarioGeneralCompleto/destacado`;
    return this.http.get<Inventario_generalModel[]>(url).pipe(
      catchError(e=>{
        return throwError(e);
      })
    )

  }
}
