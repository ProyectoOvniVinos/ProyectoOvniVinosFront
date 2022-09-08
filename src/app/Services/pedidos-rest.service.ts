import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PedidoModel } from '../Models/Pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosRestService {

  url: string = "http://localhost:8080/apiPedidos/";

  constructor(private http: HttpClient) { }

  getPedidosCliente(correo: string): Observable<PedidoModel[]> {
    const url: string = `${this.url}pedidosCliente/${correo}`
    return this.http.get<PedidoModel[]>(url);
  }

  getPedidosPendientes(): Observable<PedidoModel[]> {
    const url: string = `${this.url}pedidosPendientes`
    return this.http.get<PedidoModel[]>(url);
  }
  getPedidosProceso(): Observable<PedidoModel[]> {
    const url: string = `${this.url}pedidosProceso`
    return this.http.get<PedidoModel[]>(url);
  }
  getPedidosTerminado(): Observable<PedidoModel[]> {
    const url: string = `${this.url}pedidosCompletados`
    return this.http.get<PedidoModel[]>(url);
  }
  getPedidosCanselados(): Observable<PedidoModel[]> {
    const url: string = `${this.url}pedidosCancelados`
    return this.http.get<PedidoModel[]>(url);
  }

  createPedido(pedido: PedidoModel): Observable<PedidoModel> {
    const url: string = `${this.url}pedido`;
    return this.http.post<PedidoModel>(url, pedido);
  }

  updatePedido(pedido: PedidoModel): Observable<PedidoModel> {
    const url: string = `${this.url}update`;
    return this.http.put<PedidoModel>(url, pedido);
  }
}
