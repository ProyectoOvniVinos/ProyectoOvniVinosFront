import { ClienteModel } from "./Cliente.model";
import { Item_ventaModel } from "./Item_venta.model";

export class VentaModel {
    codigo_venta!:number;
	cliente!:ClienteModel;
	precio_venta!:number;
	fecha_venta !:Date;
    cantidad_venta!:number;

	items:Array<Item_ventaModel>=[];
}
