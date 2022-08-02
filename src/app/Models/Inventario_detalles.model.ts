import { Inventario_generalModel } from "./Inventario_general.model";
import { ProductoModel } from "./Producto.model";

export class Inventario_detallesModel {
    id_detalles!:number;
    registro_general!:Inventario_generalModel;
    cantidad_producto !:number;
}
