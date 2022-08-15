import { Contabilidad_mensualModel } from "./Contabilidad_mensual.model";

export class Contabilidad_diariaModel {
    idRegistroContabilidadDiaria!:number;
	ventasContabilidadDiaria !:number;
	egresosContabilidadDiaria !:number;
	ingresosContabilidadDiaria!:number;
	idRegistroContabilidadMensual!:Contabilidad_mensualModel;
	fecha!:Date;
}
