import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inventario_generalModel } from 'src/app/Models/Inventario_general.model';
import { ProductoModel } from '../../../Models/Producto.model';
import { InventarioGService } from '../../../Services/inventario-g.service';
import { ModalInventarioGComponent } from '../../Modal/modal-inventario-g/modal-inventario-g.component';

@Component({
  selector: 'app-inventario-general',
  templateUrl: './inventario-general.component.html',
  styleUrls: ['./inventario-general.component.css']
})
export class InventarioGeneralComponent implements OnInit {

  bandera:Boolean;
  inventarioG: Inventario_generalModel[] = [];
  producto: ProductoModel = {
    codigoProducto :1,
    nombreProducto :"vino abocado",
    precioProducto : 4000,
    precioProductoProveedor : 50000,
    descripcionProducto : "Es muy rico",
    fotoProducto : "../../../../assets/TEMPORALES/vino1.jpg",
    estado : "1"
  }
  constructor(public dialog:MatDialog, private inventarioService: InventarioGService) { }

  ngOnInit(): void {
    this.inventarioService.getInventarioGeneralCompleto().subscribe(inventarioGeneral=>{
      this.bandera=true;
      this.inventarioG = inventarioGeneral; 
    });
  }

  openDialog(inventario: Inventario_generalModel): void {
    const dialogRef = this.dialog.open(ModalInventarioGComponent, {
      width: '50%',
      data: inventario,
    });
  }

}
