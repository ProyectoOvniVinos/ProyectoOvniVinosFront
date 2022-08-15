import { CompraModel } from "./Compra.model";
import { Contabilidad_diariaModel } from "./Contabilidad_diaria.model";
import { ProductoModel } from "./Producto.model";

export class Item_compraModel {
    idPuente!:number;
    codigoProducto!:ProductoModel;
    cantidadProducto!:number;
    precioCompraDetalle!:number;

    public calcularImporte(): number {
        return this.cantidadProducto * this.codigoProducto.precioProductoProveedor;
    }
}