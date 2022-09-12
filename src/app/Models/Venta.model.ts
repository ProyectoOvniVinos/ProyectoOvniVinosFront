import { ClienteModel } from "./Cliente.model";
import { Item_ventaModel } from "./Item_venta.model";

export class VentaModel {
    codigoVenta!:number;
	precioVenta!:number;
    cantidadVenta!:number;
	fechaVenta !:Date;
	correoCliente!:ClienteModel;
	idRegistroContabilidadDiaria!:any;
	ventas:Item_ventaModel[] = [];
}
