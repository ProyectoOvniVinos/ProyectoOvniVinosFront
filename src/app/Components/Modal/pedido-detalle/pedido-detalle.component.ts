import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PedidoModel } from 'src/app/Models/Pedido.model';
import { AdminService } from 'src/app/Services/admin.service';
import { ConvertirAdminService } from 'src/app/Services/convertir-admin.service';
import { LoginService } from 'src/app/Services/login.service';
import { PedidosRestService } from 'src/app/Services/pedidos-rest.service';

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
    this.updatePedido();
    this.regresar = true;
  }

  pasarCompletado(){
    console.log(this.pedido);
    
    this.pedido.estado = '3';
    this.updatePedido();
    this.regresar = true;

  }
  
  pasarCancelado(){
    this.pedido.estado = '4';
    this.updatePedido();
    this.regresar = true;

  }

  updatePedido(){
    console.log(this.pedido);
    
    this.adminService.getAdminById(this.loginService.usuario.correo).subscribe(admin=>{
      this.pedido.administrador = this.convertirAdmin.convertir(admin);
      this.pedidosRestService.updatePedido(this.pedido).subscribe(resp=>{
        console.log(resp);
      })
    });
  }
}
