
import { Contabilidad_diariaModel } from "./Contabilidad_diaria.model";
import { ProductoModel } from "./Producto.model";
import { VentaModel } from "./Venta.model";

export class Item_ventaModel {
    idPuente!:number;
    codigoProducto!:ProductoModel;
    cantidadProducto!:number;
    precioVentaDetalle!:number;

    public calcularImporte(): number {
        return this.cantidadProducto * this.codigoProducto.precioProducto;
    }
}
