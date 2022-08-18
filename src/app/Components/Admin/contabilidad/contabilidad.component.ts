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

  fecha: string = '';

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
      this.contabilidadDiaria();
    }else if(term == "Mensual"){
      this.contabilidad = "Mensual";
      this.contabilidadMensual();    
    }else{
      this.contabilidad = "Anual";     
      this.contabilidadAnual();
    }
  }

  contabilidadDiaria(){
    this.contabilidadService.getContabilidadDiaria(0).subscribe( contabilidad => {
      this.contabilidadesDiarias = contabilidad;
      this.contabilidadesMensuales = [];
      this.contabilidadesAnuales = [];
    });
  }

  contabilidadMensual(){
    this.contabilidadService.getContabilidadMensual(0).subscribe( contabilidad => {
      this.contabilidadesMensuales = contabilidad;
      this.contabilidadesDiarias = [];
      this.contabilidadesAnuales = [];
    });
  }

  contabilidadAnual(){
    this.contabilidadService.getContabilidadAnual(0).subscribe( contabilidad => {
      this.contabilidadesAnuales = contabilidad;
      this.contabilidadesMensuales = [];
      this.contabilidadesDiarias = [];
    }); 
  }

  buscar(){
    if(this.contabilidad == "Diaria"){
      if(this.fecha == ''){
        this.contabilidadDiaria();
      }else{
        let fecha = this.fecha;
      this.contabilidadService.getContabilidadDiariaFecha(fecha).subscribe(contabilidad => {
        this.contabilidadesDiarias = contabilidad
      });
      }
    }else if(this.contabilidad == "Mensual"){
      if(this.fecha == ''){
        this.contabilidadMensual();
      }else{
        let fecha = this.fecha.split('-');
        let fechaMes = fecha[0]+'-'+fecha[1];
        this.contabilidadService.getContabilidadMensualFecha(fechaMes).subscribe(contabilidad => this.contabilidadesMensuales = contabilidad);
      }
    }else{
      if(this.fecha == ''){
        this.contabilidadAnual();
      }else{
        let fecha = this.fecha.split('-');
        let fechaAno = fecha[0];
        this.contabilidadService.getContabilidadAnualFecha(fechaAno).subscribe(contabilidad => this.contabilidadesAnuales = contabilidad);
      }
    }
  }
}
