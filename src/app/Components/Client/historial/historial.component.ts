import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModel } from '../../../Models/Cliente.model';
import { VentaModel } from '../../../Models/Venta.model';
import { ClienteService } from '../../../Services/cliente.service';
import { LoginService } from '../../../Services/login.service';
import { ModalDetallesVentaComponent } from '../../Modal/modal-detalles-venta/modal-detalles-venta.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  usuario;
  cliente:ClienteModel;
  ventas: VentaModel[]=[]
  constructor(private clienteService:ClienteService, public dialog: MatDialog, private loginService:LoginService) { }

  ngOnInit(): void {
    this.usuario = this.loginService.usuario;
    this.clienteService.getByEmail(this.usuario.correo).subscribe(resp=>{
      
      this.cliente = resp;
      this.ventas=this.cliente.ventas;
      this.ordenar();
      
    })
  }

  ordenar(){
    this.ventas=this.ventas.filter(venta => venta.idRegistroContabilidadDiaria!=null)
  }

  abrirModal(venta: VentaModel){
    venta.correoCliente = this.cliente;
    this.openDialog(venta);
  }

  openDialog( venta: VentaModel): void {
    const dialogRef = this.dialog.open(ModalDetallesVentaComponent, {
      width: '700px',
      data: venta,
    });
  }

}
