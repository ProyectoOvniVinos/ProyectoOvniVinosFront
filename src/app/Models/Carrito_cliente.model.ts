import { ClienteModel } from "./Cliente.model";
import { ProductoModel } from "./Producto.model";

export class Carrito_clienteModel {
    id_registro!:number;
    cliente:ClienteModel;
    producto:ProductoModel;
    cantidad_producto:number;
}
