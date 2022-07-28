import { AdministradorModel } from "./Administrador.model";
import { Item_compraModel } from "./Item_compra.model";

export class CompraModel {
    codigo_compra!:number;
    administrador!:AdministradorModel;
    precio_compra!:number;
    fecha_compra!:Date;
    cantidad_compra!:number;
    items:Array<Item_compraModel>=[];
    
}
