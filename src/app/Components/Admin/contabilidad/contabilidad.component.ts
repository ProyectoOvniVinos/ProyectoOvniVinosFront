import { Component, OnInit } from '@angular/core';
import { ContabilidadAnualModel } from '../../../Models/ContabilidadAnual.model';
import { ContabilidadDiariaModel } from '../../../Models/ContabilidadDiaraia.model';
import { Contabilidad_mensualModel } from '../../../Models/Contabilidad_mensual.model';
import { ContabilidadService } from '../../../Services/contabilidad.service';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {

  contabilidad: string = "Diaria";

  contabilidadesMensuales: Contabilidad_mensualModel[]=[];
  contabilidadesDiarias: ContabilidadDiariaModel[]=[];
  contabilidadesAnuales: ContabilidadAnualModel[]=[];

  constructor(private contabilidadService: ContabilidadService) { }

  ngOnInit(): void {
    this.contabilidad = "Diaria";
      this.contabilidadService.getContabilidadDiaria(0).subscribe( contabilidad => {
        this.contabilidadesDiarias = contabilidad;
      });
  }

  traerContabiliad(term: string){
    if(term == "Diaria"){
      this.contabilidad = "Diaria";
      this.contabilidadService.getContabilidadDiaria(0).subscribe( contabilidad => {
        this.contabilidadesDiarias = contabilidad;
        this.contabilidadesMensuales = [];
        this.contabilidadesAnuales = [];
      });
    }else if(term == "Mensual"){
      this.contabilidad = "Mensual";
      this.contabilidadService.getContabilidadMensual(0).subscribe( contabilidad => {
        this.contabilidadesMensuales = contabilidad;
        this.contabilidadesDiarias = [];
        this.contabilidadesAnuales = [];
      });
    }else{
      this.contabilidad = "Anual";     
      this.contabilidadService.getContabilidadAnual(0).subscribe( contabilidad => {
        this.contabilidadesAnuales = contabilidad;
        this.contabilidadesMensuales = [];
        this.contabilidadesDiarias = [];
      }); 
    }
  }

}
