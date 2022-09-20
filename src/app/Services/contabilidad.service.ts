import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Contabilidad_mensualModel } from '../Models/Contabilidad_mensual.model';
import { ContabilidadDiariaModel } from '../Models/ContabilidadDiaraia.model';
import { ContabilidadAnualModel } from '../Models/ContabilidadAnual.model';

@Injectable({
  providedIn: 'root'
})
export class ContabilidadService {

  url: string = "https://ovnivinos.herokuapp.com/apiContabilidad/"

  constructor(private http: HttpClient) { }

  getContabilidadMensual(numeroPagina:number):Observable<Contabilidad_mensualModel[]>{
    const url = `${this.url}contabilidadesMensuales/page/${numeroPagina}`;
    return this.http.get<Contabilidad_mensualModel[]>(url).pipe(
      map((data:any)=>{
        return data.content;
      }

      )
    );
  }

  getContabilidadDiaria(numeroPagina:number):Observable<ContabilidadDiariaModel[]>{
    const url = `${this.url}contabilidadesDiarias/page/${numeroPagina}`;
    return this.http.get<ContabilidadDiariaModel[]>(url).pipe(
      map((data:any)=>{
        return data.content;
      }

      )
    );
  }

  getContabilidadAnual(numeroPagina:number):Observable<ContabilidadAnualModel[]>{
    const url = `${this.url}contabilidadesAnuales/page/${numeroPagina}`;
    return this.http.get<ContabilidadAnualModel[]>(url).pipe(
      map((data:any)=>{
        return data.content;
      }

      )
    );
  }

  getContabilidadAnualFecha(term:string):Observable<ContabilidadAnualModel[]>{
    const url = `${this.url}contabilidadesAnuales/fecha/${term}`;
    return this.http.get<ContabilidadAnualModel[]>(url);
  }

  getContabilidadMensualFecha(term:string):Observable<Contabilidad_mensualModel[]>{
    const url = `${this.url}contabilidadesMensuales/fecha/${term}`;
    return this.http.get<Contabilidad_mensualModel[]>(url);
  }

  getContabilidadDiariaFecha(term:string):Observable<ContabilidadDiariaModel[]>{
    const url = `${this.url}contabilidadesDiarias/fecha/${term}`;
    return this.http.get<ContabilidadDiariaModel[]>(url);
  }
}
