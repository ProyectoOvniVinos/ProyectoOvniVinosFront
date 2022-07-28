import { AdministradorModel } from "./Administrador.model";

export class CompraModel {
    codigo_compra!:number;
    administrador!:AdministradorModel;
    precio_compra!:number;
    fecha_compra!:Date;
    cantidad_compra!:number;
    
    
}
