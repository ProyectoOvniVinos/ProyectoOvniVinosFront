import { Contabilidad_anualModel } from "./Contabilidad_anual.model";

export class Contabilidad_mensualModel {
    idRegistroContabilidadMensual!:number;
    ventasContabilidadMensual!:number;
    egresosContabilidadMensual!:number;
	ingresosContabilidadMensual!:number;
    id_registroContabilidadAnual!:Contabilidad_anualModel;
    fecha !:Date;
}
