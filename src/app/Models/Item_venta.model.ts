
import { Contabilidad_diariaModel } from "./Contabilidad_diaria.model";
import { ProductoModel } from "./Producto.model";
import { VentaModel } from "./Venta.model";

export class Item_ventaModel {
    id_puente!:number;
    venta!:VentaModel;
    producto!:ProductoModel;
    cantidad_producto!:number;
    contabilidad_diaria!:Contabilidad_diariaModel;
}
