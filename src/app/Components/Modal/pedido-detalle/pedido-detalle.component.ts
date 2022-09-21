import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PedidoModel } from '../../../Models/Pedido.model';
import { AdminService } from '../../../Services/admin.service';
import { ConvertirAdminService } from '../../../Services/convertir-admin.service';
import { LoginService } from '../../../Services/login.service';
import { PedidosRestService } from '../../../Services/pedidos-rest.service';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {

  texto:string = '';
  texto2:string = '';

  regresar:boolean = false;

  constructor(public dialogRef: MatDialogRef<PedidoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public pedido: PedidoModel, public pedidosRestService:PedidosRestService,
                private loginService: LoginService, private adminService: AdminService, private convertirAdmin: ConvertirAdminService) { }

  ngOnInit(): void {
    console.log(this.pedido.direccion);
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
    console.log(this.pedido);
    
    this.pedido.estado = '3';

  }
  
  pasarCancelado(){
    this.pedido.estado = '4';
  }
}
