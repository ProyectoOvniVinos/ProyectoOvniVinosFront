import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PedidoModel } from 'src/app/Models/Pedido.model';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {

  texto:string = '';
  texto2:string = '';

  constructor(public dialogRef: MatDialogRef<PedidoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public pedido: PedidoModel) { }

  ngOnInit(): void {
    if(this.pedido.estado == '1'){
      this.texto = 'en proceso';
    }else if(this.pedido.estado == '2'){
      this.texto = 'completado';
      this.texto2 = 'cancelado';
    }
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  pasarProceso(){
    this.pedido.estado = '2';
  }

  pasarCompletado(){
    this.pedido.estado = '3';
  }
  
  pasarCancelado(){
    this.pedido.estado = '4';
  }
}
