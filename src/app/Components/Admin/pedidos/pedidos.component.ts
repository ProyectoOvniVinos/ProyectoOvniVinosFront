import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CarritoClienteModel } from 'src/app/Models/CarritoCliente.model';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { Item_ventaModel } from 'src/app/Models/Item_venta.model';
import { PedidoModel } from 'src/app/Models/Pedido.model';
import { VentaModel } from 'src/app/Models/Venta.model';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ClienteService } from 'src/app/Services/cliente.service';
import { LoginService } from 'src/app/Services/login.service';
import { PedidosRestService } from 'src/app/Services/pedidos-rest.service';
import { PedidoDetalleComponent } from '../../Modal/pedido-detalle/pedido-detalle.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  
  carrito: CarritoClienteModel;
  banderaD = true;
  banderaC = true;
  texto = '';
  lugar = 'Pendientes';
  lugarmijo = '3';
  isDomicilio:boolean=true;
  venta: VentaModel = new VentaModel();
  objeto:{venta:VentaModel,esDomi:boolean}={
    venta:this.venta,
    esDomi:this.isDomicilio
  }

  direccion:string=null;

  pedidos: PedidoModel[] = [];

  constructor(private pedidoService: PedidosRestService, public dialog: MatDialog, public loginService: LoginService,
          private activateRoute: ActivatedRoute, private carritoService: CarritoService,
          private clienteService: ClienteService) { }

  ngOnInit(): void {
    //this.pedidosPendientes();
    this.activateRoute.params.subscribe(params=>{
      let carrito  = params['carrito'];
      if(carrito){
        this.lugarmijo = '3';
      }else{
        if(this.loginService.hasRole('ROLE_ADMIN')){
          this.lugarmijo = '1';
        }else{
          this.lugarmijo = '2';
        }
      }
    })

    this.clienteService.getByEmail(this.loginService.usuario.correo).subscribe((resp:ClienteModel)=>{
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
      console.log(this.venta);
        //this.valorTotal= this.carrito.precioCarrito;
        //this.cantidadTotal+= item.cantidadProducto;

    });

  }

  buscar(){
    if(this.texto=''){
      this.pedidosPendientes();
    }else{
      this.pedidosCliente();
    }
  }

  abrirModal(pedido:PedidoModel){
    this.openDialog(pedido)
  }

  openDialog( pedido: PedidoModel): void {
    const dialogRef = this.dialog.open(PedidoDetalleComponent, {
      width: '70%',
      data: pedido,
    });
  }

  pedidosCliente(){
    this.pedidoService.getPedidosCliente(this.texto).subscribe(
      pedidos =>{
        if(this.lugar=='Pendientes'){
          this.pedidos = pedidos.filter(pedido => pedido.estado=='1');
        }else if(this.lugar=='en Proceso'){
          this.pedidos = pedidos.filter(pedido => pedido.estado=='2');
        }else if(this.lugar=='Completados'){
          this.pedidos = pedidos.filter(pedido => pedido.estado=='3');
        }else{
          this.pedidos = pedidos.filter(pedido => pedido.estado=='4');
        }
      }
    );
  }

  pedidosPendientes(){
    this.pedidoService.getPedidosPendientes().subscribe(
      pedidos =>{
        this.pedidos = pedidos;
        this.lugar = 'Pendientes';
      }
    );
  }

  pedidosProceso(){
    this.pedidoService.getPedidosProceso().subscribe(
      pedidos =>{
        this.pedidos = pedidos;
        this.lugar = 'en Proceso';
      }
    );
  }

  pedidosCompletados(){
    this.pedidoService.getPedidosTerminado().subscribe(
      pedidos =>{
        this.pedidos = pedidos;
        this.lugar = 'Completados';
      }
    );
  }

  pedidosCanselados(){
    this.pedidoService.getPedidosCanselados().subscribe(
      pedidos =>{
        this.pedidos = pedidos;
        this.lugar = 'Canselados';
      }
    );
  }

  confirmarCompra(){
    this.venta.correoCliente.direccionCliente=this.direccion
    
    
    let newObjeto={
      venta:this.venta,
      esDomi:this.isDomicilio
    }
    this.objeto=newObjeto;

    console.log(this.venta);
  }

  cambiarSelectedTrue(){

    this.isDomicilio=true;

    let newObjeto={
      venta:this.venta,
      esDomi:this.isDomicilio
    }
    this.objeto=newObjeto;

  }
  cambiarSelectedFalse(){

    this.isDomicilio=false;

    let newObjeto={
      venta:this.venta,
      esDomi:this.isDomicilio
    }
    this.objeto=newObjeto;

  }

}
