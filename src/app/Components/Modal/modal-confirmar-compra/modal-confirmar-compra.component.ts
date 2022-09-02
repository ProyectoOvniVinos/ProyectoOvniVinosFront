import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { ClienteService } from 'src/app/Services/cliente.service';
import { LoginService } from 'src/app/Services/login.service';
import { VentaModel } from '../../../Models/Venta.model';

@Component({
  selector: 'app-modal-confirmar-compra',
  templateUrl: './modal-confirmar-compra.component.html',
  styleUrls: ['./modal-confirmar-compra.component.css']
})
export class ModalConfirmarCompraComponent implements OnInit {

  isDomicilio:boolean=true;
  objeto:{venta:VentaModel,esDomi:boolean}={
    venta:this.venta,
    esDomi:this.isDomicilio
  }

  direccion:string=null;

  constructor(public dialogRef: MatDialogRef<ModalConfirmarCompraComponent>,
    @Inject(MAT_DIALOG_DATA) public venta: VentaModel,public loginService: LoginService,public clienteService: ClienteService) {
      
    }

  ngOnInit(): void {
    this.clienteService.getByEmail(this.loginService.usuario.correo).subscribe((resp:ClienteModel)=>{
      this.direccion=resp.direccionCliente;
    })
    
    
    

  }

  cambiarSelectedTrue(){

    this.isDomicilio=true

  }
  cambiarSelectedFalse(){

    this.isDomicilio=false
  }
  onNoClick(): void{
    this.dialogRef.close();
  }

  confirmarCompra(){
    this.venta.correoCliente.direccionCliente=this.direccion
    
    
    let newObjeto={
      venta:this.venta,
      esDomi:this.isDomicilio
    }
    this.objeto=newObjeto;
  }

}
