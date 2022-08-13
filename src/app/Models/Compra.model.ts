import { AdministradorModel } from "./Administrador.model";
import { Item_compraModel } from "./Item_compra.model";

export class CompraModel {
    codigo_compra!:number;
    precio_compra!:number;
    cantidad_compra!:number;
    correo_admin!:AdministradorModel;
    fecha_compra!:Date;
    compras:Array<Item_compraModel>=[];
    
}
