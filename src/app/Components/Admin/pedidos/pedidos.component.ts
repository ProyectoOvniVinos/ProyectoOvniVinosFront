import { ModalLoadingComponent } from './../../Modal/modal-loading/modal-loading.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoClienteModel } from '../../../Models/CarritoCliente.model';
import { ClienteModel } from '../../../Models/Cliente.model';
import { Item_ventaModel } from '../../../Models/Item_venta.model';
import { PedidoModel } from '../../../Models/Pedido.model';
import { VentaModel } from '../../../Models/Venta.model';
import { CarritoService } from '../../../Services/carrito.service';
import { ClienteService } from '../../../Services/cliente.service';
import { LoginService } from '../../../Services/login.service';
import { PedidosRestService } from '../../../Services/pedidos-rest.service';
import { VentaService } from '../../../Services/venta.service';
import { ModalErrorComponent } from '../../Modal/modal-error/modal-error.component';
import { PedidoDetalleComponent } from '../../Modal/pedido-detalle/pedido-detalle.component';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ModalLoadingCompraComponent } from '../../Modal/modal-loading-compra/modal-loading-compra.component';
import { AdminService } from 'src/app/Services/admin.service';
import { ConvertirAdminService } from 'src/app/Services/convertir-admin.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit, OnDestroy {

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
  pedidosPendientesC: PedidoModel[] = [];
  pedidosProcesoC: PedidoModel[] = [];

  cargo: boolean = false;
  constructor(private pedidoService: PedidosRestService, public dialog: MatDialog, public loginService: LoginService,
    private activateRoute: ActivatedRoute, private carritoService: CarritoService,
    private clienteService: ClienteService, private ventaService: VentaService,
    private router: Router, private adminService: AdminService, private convertirAdmin: ConvertirAdminService,
    public pedidosRestService:PedidosRestService) {

  }
  
  ngOnDestroy(){
    this.client.deactivate();
  }

  ngOnInit(): void {

    this.inicio1();
    if(this.loginService.hasRole("ROLE_CLIENTE")){

      this.inicio2();
    }

    this.client = new Client();
    this.client.webSocketFactory = (): any => {
      return new SockJS("https://ovnivinos.herokuapp.com/alerta-back");
    }

    this.client.activate();

    this.client.onConnect = (frame) => {

      this.client.subscribe('/topic/alerta', e => {
        this.pedidosPendientesL = JSON.parse(e.body) as PedidoModel[];
        if (this.lugar == 'Pendientes') {
          this.pedidos = this.pedidosPendientesL;
        }

      });

      this.client.subscribe('/topic/alerta2', e => {
        this.pedidosProcesoL = JSON.parse(e.body) as PedidoModel[];
        if (this.lugar == 'en Proceso') {
          this.pedidos = this.pedidosProcesoL;
        }

      });

      this.client.subscribe('/topic/alerta3', e => {
        let pedidos = JSON.parse(e.body) as PedidoModel[];
        this.pedidosPendientesC = pedidos.filter(pedido=>pedido.estado=='1');
        this.pedidosProcesoC = pedidos.filter(pedido=>pedido.estado=='2');
        if (this.lugar == 'en Proceso') {
          this.pedidos = this.pedidosProcesoC;
        }else{
          this.pedidos = this.pedidosPendientesC;
        }

      });

      this.client.publish({ destination: '/app/alerta', body: "entro" });
      this.client.publish({ destination: '/app/alerta2', body: "entro" });
      if(this.loginService.hasRole('ROLE_CLIENTE')){
        this.client.publish({ destination: '/app/alerta3', body: this.loginService.usuario.correo });
      }
    };

    this.client.onDisconnect = (frame) => {
    }

  }

  conectar() {
    this.client.activate();
  }
  desconectar() {
    this.client.deactivate();
  }
  actualizarPedidosPendientes(): void {
    this.client.publish({ destination: '/app/alerta', body: "entro" });
  }

  actualizarPedidosProceso(): void {
    this.client.publish({ destination: '/app/alerta2', body: "entro" });
  }

  actualizarPedidosCliente(correo:string): void {
    this.client.publish({ destination: '/app/alerta3', body: correo });
  }

  inicio1() {

    this.pedidosPendientes();
    this.getPedidosCliente(1);
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
          this.pedidoService.getPedidosClienteEspecifico(this.loginService.usuario.correo).subscribe(pedidos => {
            this.pedidos = pedidos;
            this.pedidosPendientesCliente()
          });
        }
      }
    })
  }

  inicio2() {
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
      this.venta.cantidadVenta = cantidad;

    });
    setTimeout(() => {
      this.cargo = true
    }, 1000)

  }

  getPedidosCliente(modo: number) {
    this.pedidoService.getPedidosCliente(this.loginService.usuario.correo).subscribe(pedidos => {
      this.pedidos = pedidos;
      this.pedidosPendientesC = pedidos.filter(pedido => pedido.estado=='1');
      this.pedidosProcesoC = pedidos.filter(pedido => pedido.estado=='2');
      if (modo == 1) {

        this.pedidos = this.pedidos.filter(pedido => pedido.estado != '2' && pedido.estado != '3' && pedido.estado != '4');

        if (this.pedidos.length == 0) {
          this.lugar = "pendientes";
        }
      } else {
        this.pedidos = this.pedidos.filter(pedido => pedido.estado != '1' && pedido.estado != '3' && pedido.estado != '4');
        if (this.pedidos.length == 0) {
          this.lugar = "en Proceso";
        }
      }
    });
  }

  buscar() {
    if (this.texto == '') {
      if (this.lugar == 'Pendientes') {
        this.pedidosPendientes();
      } else if (this.lugar == 'en Proceso') {
        this.pedidosProceso();
      } else if (this.lugar == 'Completados') {
        this.pedidosCompletados();
      } else {
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
    dialogRef.afterClosed().subscribe((result: PedidoModel) => {
      if (this.lugar == "Pendientes") {
        this.pedidosPendientes();
      } else if (this.lugar == "en Proceso") {
        this.pedidosProceso();
      } else if (this.lugar == "Completados") {
        this.pedidosCompletados();
      } else {
        this.pedidosCanselados();
      }
      
      console.log(result);
      
      if(result){
        console.log(result,"antes");

        this.adminService.getAdminById(this.loginService.usuario.correo).subscribe(admin=>{
          result.administrador = this.convertirAdmin.convertir(admin);
          this.pedidosRestService.updatePedido(result).subscribe(resp=>{
            this.actualizarPedidosPendientes();
            this.actualizarPedidosProceso();
            this.actualizarPedidosCliente(result.cliente.correoCliente);
          })
        });
        
        
      }

    });
  }

  pedidosCliente() {

    this.pedidoService.getPedidosCliente(this.texto).subscribe(
      pedidos => {
        if (this.lugar == 'Pendientes') {
          this.pedidos = pedidos.filter(pedido => pedido.estado == '1');
        } else if (this.lugar == 'en Proceso') {
          this.pedidos = pedidos.filter(pedido => pedido.estado == '2');
        } else if (this.lugar == 'Completados') {
          this.pedidos = pedidos.filter(pedido => pedido.estado == '3');
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
        if (this.texto != '' && this.texto != null) {
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
        if (this.texto != '' && this.texto != null) {
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
        if (this.texto != '' && this.texto != null) {
          this.buscar();
        }
      }
    );
  }

  pedidosCanselados() {
    this.mostrarCancelados = true;
    this.pedidoService.getPedidosCanselados().subscribe((pedidos: PedidoModel[]) => {
      pedidos.filter(pedido => pedido.estado == '4')

      this.pedidos = pedidos;
      this.lugar = 'Cancelados';
      if (this.texto != '' && this.texto != null) {
        this.buscar();
      }
    }
    );
  }

  openDialogLoading(){
    const dialogRef = this.dialog.open(ModalLoadingCompraComponent, {
      width: '95px',
      height: '98px',
    });
  }

  closeDialogLoading(){
    const dialogRef = this.dialog.closeAll();
  }

  confirmarCompra() {
    this.openDialogLoading();
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
      this.pedidoService.createPedido(pedido, this.venta.correoCliente.direccionCliente).subscribe(e => {
       
      });
      //this.pedidoSocket.actualizarPedidos();
      for (let i = this.carrito.itemCarrito.length; i > 0; i--) {
        this.carrito.itemCarrito.pop()
      }
      this.carritoService.actualizarCarrito(this.carrito).subscribe();
      this.closeDialogLoading();
      this.openDialogConfirmacion("¡¡ÉXITO!!!", "Su compra se ha realizado satisfactoriamente.")
      this.actualizarPedidosPendientes();
      this.router.navigate(['/pedidos']);
      this.getPedidosCliente(1)
    }, err => {
      if (err.error.mensaje == "cantidad insuficiente") {
        this.openDialogConfirmacion("Advertencia!!", `${err.error.mensaje}`)
      } else {
        this.openDialogConfirmacion("ERROR", "Lo sentimos, ha ocurrido un problema.")
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

  pedidosPendientesCliente() {

    this.getPedidosCliente(1);
  }

  pedidosProcesoCliente() {
    this.getPedidosCliente(2);
  }

}
