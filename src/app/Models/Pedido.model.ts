import { AdministradorModel } from "./Administrador.model";
import { ClienteModel } from "./Cliente.model";
import { DireccionPedidoModel } from "./DireccionPedido.model";
import { VentaModel } from "./Venta.model";


export class PedidoModel {
    id!:number;
	estado!:string;
	modoAdquirir!:string;
    administrador!:AdministradorModel;
	cliente!:ClienteModel;
	venta:VentaModel;
	direccion:DireccionPedidoModel;
}
