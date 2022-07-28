import { ClienteModel } from "./Cliente.model";

export class VentaModel {
    codigo_venta!:number;
	cliente!:ClienteModel;
	precio_venta!:number;
	fecha_venta !:Date;
    cantidad_venta!:number;
}
