import { AdministradorModel } from "./Administrador.model";
import { Item_compraModel } from "./Item_compra.model";

export class CompraModel {
    codigoCompra!:number;
    precioCompra!:number;
    cantidadCompra!:number;
    fechaCompra:Date;
    administradorCompra!:AdministradorModel;
    compras:Item_compraModel[] = [];
}
