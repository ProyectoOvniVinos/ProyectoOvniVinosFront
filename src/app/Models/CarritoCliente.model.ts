import { ClienteModel } from "./Cliente.model";
import { ItemCarritoModel } from "./itemCarrito.model";
import { ProductoModel } from "./Producto.model";

export class CarritoClienteModel {
    idCarrito!:number;
    precioCarrito:number;
    cantidadCarrito:number;
    cliente:ClienteModel;
    itemCarrito:ItemCarritoModel[]=[];
}
