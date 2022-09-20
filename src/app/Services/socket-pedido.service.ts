import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { PedidoModel } from '../Models/Pedido.model';
import { ProductoModel } from '../Models/Producto.model';

@Injectable({
  providedIn: 'root'
})
export class SocketPedidoService {
  
  private client!: Client;
  pedidos: ProductoModel[] = [];

  constructor() {
    this.client = new Client();
    this.client.webSocketFactory = ():any => {
      return new SockJS("https://ovnivinos.herokuapp.com/alerta-back");
    }
    this.conectando();
  }

  conectando(){
    this.client.onConnect = (frame) => {
      console.log("Desonectados: " + !this.client.connected + " : " + frame);
      this.client.subscribe('/topic/alerta',e=>{
        console.log(e);
        this.pedidos = JSON.parse(e.body) as ProductoModel[];
        
      });
      this.client.publish({ destination: '/app/alerta',body: "entro" });
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
