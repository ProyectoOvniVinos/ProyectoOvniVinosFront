import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModel } from 'src/app/Models/Cliente.model';
import { VentaModel } from 'src/app/Models/Venta.model';
import { ClienteService } from 'src/app/Services/cliente.service';
import { ModalDetallesVentaComponent } from '../../Modal/modal-detalles-venta/modal-detalles-venta.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  cliente:ClienteModel;
  constructor(private clienteService:ClienteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.clienteService.getByEmail("c@gmail.com").subscribe(resp=>{
      
      this.cliente = resp;
      
    })
  }
  abrirModal(venta: VentaModel){
    console.log(venta);
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
