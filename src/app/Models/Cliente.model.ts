import { CarritoClienteModel } from "./CarritoCliente.model";
import { VentaModel } from "./Venta.model";

export class ClienteModel {
    correoCliente!: string;
    nombreCliente!: string;
    apellidoCliente!: string;
    direccionCliente!: string;
    telefonoCliente!: string;
    passwordCliente!: string;
    carrito: CarritoClienteModel = new CarritoClienteModel()
    ventas: VentaModel[] = [];
}
