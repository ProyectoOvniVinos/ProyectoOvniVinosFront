import { ProductoModel } from "./Producto.model";

export class Inventario_generalModel {
    id_registro!:number;
    producto!:ProductoModel;
    cantidad_producto!:number;
    fecha_ultimo_ingreso_inventario !: Date;
}
