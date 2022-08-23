import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModel } from 'src/app/Models/Producto.model';
import { VentaService } from '../../../Services/venta.service';
import { VentaModel } from '../../../Models/Venta.model';
import { ModalDetallesVentaComponent } from '../../Modal/modal-detalles-venta/modal-detalles-venta.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  
  ventas: VentaModel[] = [];
  productos: ProductoModel[] = [];
  constructor(private ventasService: VentaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.ventasService.getVentas().subscribe(ventas => {
      this.ventas = ventas;
    });
  }

  abrirModal(venta: VentaModel){
    this.openDialog(venta)
  }

  openDialog( venta: VentaModel): void {
    const dialogRef = this.dialog.open(ModalDetallesVentaComponent, {
      width: '700px',
      data: venta,
    });
  }

}
