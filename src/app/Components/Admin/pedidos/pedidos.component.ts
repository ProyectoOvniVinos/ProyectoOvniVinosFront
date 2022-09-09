import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { Item_ventaModel } from 'src/app/Models/Item_venta.model';
import { PedidoModel } from 'src/app/Models/Pedido.model';
import { VentaModel } from 'src/app/Models/Venta.model';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { LoginService } from 'src/app/Services/login.service';
import { PedidosRestService } from 'src/app/Services/pedidos-rest.service';
import { VentaService } from 'src/app/Services/venta.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { PedidoDetalleComponent } from '../../Modal/pedido-detalle/pedido-detalle.component';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  private client!: Client;

  carrito: CarritoClienteModel;
  banderaD = true;
  banderaC = true;
  texto = null;
  lugar = 'Pendientes';
  lugarmijo = '2';
  isDomicilio: boolean = true;

  mostrarCancelados = false;
  venta: VentaModel = new VentaModel();

  pedidos: PedidoModel[] = [];
  pedidosPendientesL: PedidoModel[] = [];
  pedidosProcesoL: PedidoModel[] = [];


  constructor(private pedidoService: PedidosRestService, public dialog: MatDialog, public loginService: LoginService,
    private activateRoute: ActivatedRoute, private carritoService: CarritoService,
    private clienteService: ClienteService, private ventaService: VentaService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.inicio1();
    this.inicio2();

    this.client = new Client();
    this.client.webSocketFactory = ():any => {
      return new SockJS("http://localhost:8080/alerta-back");
    }

    this.client.activate();

    this.client.onConnect = (frame) => {
      
      console.log("Desonectados: " + !this.client.connected + " : " + frame);
      this.client.subscribe('/topic/alerta',e=>{
        this.pedidosPendientesL = JSON.parse(e.body) as PedidoModel[];
        if(this.lugar == 'Pendientes'){
          this.pedidos = this.pedidosPendientesL;
        }
        
      });

      this.client.subscribe('/topic/alerta2',e=>{
        this.pedidosProcesoL = JSON.parse(e.body) as PedidoModel[];
        if(this.lugar == 'en Proceso'){
          this.pedidos = this.pedidosProcesoL;
        }
        
      });

      this.client.publish({ destination: '/app/alerta',body: "entro" });
      this.client.publish({ destination: '/app/alerta2',body: "entro" });
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
  actualizarPedidosPendientes(): void {
    this.client.publish({ destination: '/app/alerta', body: "entro"});
  }

  actualizarPedidosProceso(): void {
    this.client.publish({ destination: '/app/alerta2', body: "entro"});
  }

  inicio1(){
    this.activateRoute.params.subscribe(params => {
      let carrito = params['carrito'];
      if (carrito) {
        this.lugarmijo = '3';
      } else {
        if (this.loginService.hasRole('ROLE_ADMIN')) {
          this.lugarmijo = '1';
          this.pedidosPendientes()
        } else {
          this.lugarmijo = '2';
          this.pedidoService.getPedidosCliente(this.loginService.usuario.correo).subscribe(pedidos => {
            this.pedidos = pedidos;
          });
        }
      }
    })
  }

  inicio2(){
    this.clienteService.getByEmail(this.loginService.usuario.correo).subscribe((resp: ClienteModel) => {
      this.carrito = resp.carrito;
      let cantidad = 0;
      this.carrito.itemCarrito.map(item => {
        let ventas: Item_ventaModel = new Item_ventaModel();
        cantidad += item.cantidadProducto;
        ventas.cantidadProducto = item.cantidadProducto;
        ventas.codigoProducto = item.codigoProducto;
        ventas.precioVentaDetalle = item.precioItem;
        this.venta.ventas.push(ventas);
      })

      this.venta.correoCliente = resp;

      this.venta.precioVenta = this.carrito.precioCarrito;
      this.venta.cantidadVenta = cantidad;        //this.valorTotal= this.carrito.precioCarrito;
      //this.cantidadTotal+= item.cantidadProducto;

    });
  }

  buscar() {
    if (this.texto == '') {
      if(this.lugar == 'Pendientes'){
        this.pedidosPendientes();
      }else if(this.lugar == 'en Proceso'){
        this.pedidosProceso();
      }else if(this.lugar == 'Completados'){
        this.pedidosCompletados();
      }else{
        this.pedidosCanselados();

      }
      
    } else {
      this.pedidosCliente();
    }
  }

  abrirModal(pedido: PedidoModel) {
    this.openDialog(pedido)
  }

  openDialogConfirmacion(titleNew: string, mensajeNew: string): void {
    const dialogRef = this.dialog.open(ModalErrorComponent, {
      width: '300px',
      data: { title: titleNew, mensaje: mensajeNew },
    });
  }

  openDialog(pedido: PedidoModel): void {
    const dialogRef = this.dialog.open(PedidoDetalleComponent, {
      width: '70%',
      data: pedido,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (this.lugar == "Pendientes") {
        this.pedidosPendientes();
      } else if (this.lugar == "en Proceso") {
        this.pedidosProceso();
      } else if (this.lugar == "Completados") {
        this.pedidosCompletados();
      } else {
        this.pedidosCanselados();
      }
     

      this.actualizarPedidosPendientes();
      this.actualizarPedidosProceso();
      

    });
  }

  pedidosCliente() {
    console.log(this.texto + "AAAAAAAAAAAAAAAAAAAAAAAAAAa");

    this.pedidoService.getPedidosCliente(this.texto).subscribe(
      pedidos => {
        if (this.lugar == 'Pendientes') {
          this.pedidos = pedidos.filter(pedido => pedido.estado == '1');
        } else if (this.lugar == 'en Proceso') {
          this.pedidos = pedidos.filter(pedido => pedido.estado == '2');
        } else if (this.lugar == 'Completados') {
          this.pedidos = pedidos.filter(pedido => pedido.estado == '3');
          console.log(this.pedidos);
        } else {
          this.pedidos = pedidos.filter(pedido => pedido.estado == '4');
        }
      }
    );
  }

  pedidosPendientes() {
    this.mostrarCancelados = false;
    this.pedidoService.getPedidosPendientes().subscribe(
      pedidos => {
        this.pedidos = pedidos;
        this.lugar = 'Pendientes';
        if(this.texto != '' && this.texto !=null){
          this.buscar();
        }
      }
    );
  }

  pedidosProceso() {
    this.mostrarCancelados = false;
    this.pedidoService.getPedidosProceso().subscribe(
      pedidos => {
        this.pedidos = pedidos;
        this.lugar = 'en Proceso';
        if(this.texto != '' && this.texto !=null){
          this.buscar();
        }
      }
    );
  }

  pedidosCompletados() {
    this.mostrarCancelados = false;
    this.pedidoService.getPedidosTerminado().subscribe(
      pedidos => {

        this.pedidos = pedidos;
        this.lugar = 'Completados';
        if(this.texto != '' && this.texto !=null){
          this.buscar();
        }
      }
    );
  }

  pedidosCanselados() {
    this.mostrarCancelados = true;
    this.pedidoService.getPedidosCanselados().subscribe((pedidos: PedidoModel[]) => {
      console.log(pedidos);
      pedidos.filter(pedido => pedido.estado == '4')
      console.log(pedidos);

      this.pedidos = pedidos;
      this.lugar = 'Canselados';
      if(this.texto != '' && this.texto !=null){
        this.buscar();
      }
    }
    );
  }

  confirmarCompra() {
    this.ventaService.addVenta(this.venta, this.isDomicilio).subscribe(venta => {
      let pedido: PedidoModel = new PedidoModel();
      pedido.cliente = venta.venta.correoCliente;
      pedido.venta = venta.venta;
      pedido.estado = '1';
      let modo = '';
      if (this.isDomicilio) {
        modo = "domicilio";
      } else {
        modo = "retiro en tienda";
      }
      pedido.modoAdquirir = modo;
      this.pedidoService.createPedido(pedido).subscribe();
      //this.pedidoSocket.actualizarPedidos();
      for (let i = this.carrito.itemCarrito.length; i > 0; i--) {
        this.carrito.itemCarrito.pop()
      }
      this.carritoService.actualizarCarrito(this.carrito).subscribe();

      this.openDialogConfirmacion("Exito!!!", "Se ha realizado la compra satisfactoriamente!")
      this.actualizarPedidosPendientes();
      this.router.navigate(['/pedidos']);
    }, err => {
      if (err.error.mensaje == "cantidad insuficiente") {
        this.openDialogConfirmacion("Advertencia!!", `${err.error.mensaje}`)
      } else {
        this.openDialogConfirmacion("Error", "Ha ocurrido un problema")
      }
    });

  }

  regresar() {
    this.router.navigate(['/catalogo']);
  }

  cambiarSelectedTrue() {

    this.isDomicilio = true;

  }
  cambiarSelectedFalse() {

    this.isDomicilio = false;

  }

}
