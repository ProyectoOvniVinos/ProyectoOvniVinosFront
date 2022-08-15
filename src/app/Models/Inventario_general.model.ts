import { Inventario_detallesModel } from "./Inventario_detalles.model";
import { ProductoModel } from "./Producto.model";

export class Inventario_generalModel {
    idRegistro!:number;
    cantidadProducto!:number;
    codigoProducto!:ProductoModel;
    detalles:Inventario_detallesModel[] = [];
}
