import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Inventario_generalModel } from '../../../Models/Inventario_general.model';
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
  banderaC: boolean = true;
  constructor(public dialog:MatDialog, private inventarioService: InventarioGService, private router:Router) { }

  ngOnInit(): void {
    this.inventarioService.getInventarioGeneralCompleto().subscribe(inventarioGeneral=>{
      this.bandera=true;
      this.inventarioG = inventarioGeneral; 
      if(this.inventarioG.length==0){
        this.banderaC = false;
      }
    });
  }

  openDialog(inventario: Inventario_generalModel): void {
    const dialogRef = this.dialog.open(ModalInventarioGComponent, {
      width: '50%',
      data: inventario,
    });
    dialogRef.afterClosed().subscribe( (result:any)=>{
      if(result==false){
        console.log("cancelo");
      }else{
        this.router.navigate([`/ingresarCompra/${inventario.codigoProducto.codigoProducto}`])
        console.log("Acepto");
        
      }
    })
  }

}

