import { CompraModel } from "./Compra.model";
import { Contabilidad_diariaModel } from "./Contabilidad_diaria.model";
import { ProductoModel } from "./Producto.model";

export class Item_compraModel {
    id_puente!:number;
    compra!:CompraModel;
    producto!:ProductoModel;
    cantidad_producto!:number;
    contabilidad_diaria!:Contabilidad_diariaModel;

    public calcularImporte(): number {
        return this.cantidad_producto * this.producto.precio_producto;
    }
}