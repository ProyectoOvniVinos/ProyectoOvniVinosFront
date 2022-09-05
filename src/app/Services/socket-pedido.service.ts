import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { PedidoModel } from '../Models/Pedido.model';

@Injectable({
  providedIn: 'root'
})
export class SocketPedidoService {
  
  private client!: Client;
  pedidos: PedidoModel[] = [];

  constructor() {
    this.client = new Client();
    this.client.webSocketFactory = ():any => {
      return new SockJS("http://localhost:8080/alerta-back");
    }
    this.client.onConnect = (frame) => {
      this.client.activate();
      console.log("Desonectados: " + !this.client.connected + " : " + frame);
      this.client.subscribe('/topic/alerta',e=>{
        this.pedidos = JSON.parse(e.body) as PedidoModel[];
        
      });
      this.client.publish({ destination: '/app/alerta' });
      /* this.client.subscribe('/topic/alerta',e=>{
        this.pedido = JSON.parse(e.body) as PedidoModel[];
        
      }); */
    };

    this.client.onDisconnect = (frame) => {
      console.log("Desonectados: " + !this.client.connected + " : " + frame);
    } 
  }
  conectar() {
    this.client.activate();
  }
  desconectar() {
    this.client.deactivate();
  }
  actualizarPedidos(): void {
    this.client.publish({ destination: '/app/alerta', body: "entro"});
  }
}
