import { ProductoModel } from "./Producto.model";

export class ItemCarritoModel {
    idPuente!:number;
    codigoProducto!:ProductoModel;
    cantidadProducto:number;
    precioItem:number;
}