import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../../Services/venta.service';
import { VentaModel } from '../../../Models/Venta.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetallesVentaComponent } from '../../Modal/modal-detalles-venta/modal-detalles-venta.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventas: VentaModel[] = [];
  constructor(private ventaService: VentaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ventaService.getVentas().subscribe(ventas=>{
      this.ventas = ventas
    });
  }

  abrirModal(venta:VentaModel){
    this.openDialog(venta);
  }

  openDialog( venta: VentaModel): void {
    const dialogRef = this.dialog.open(ModalDetallesVentaComponent, {
      width: '700px',
      data: venta,
    });
  }

}
