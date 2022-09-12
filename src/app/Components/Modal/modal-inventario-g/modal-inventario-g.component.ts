import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inventario_generalModel } from '../../../Models/Inventario_general.model';

@Component({
  selector: 'app-modal-inventario-g',
  templateUrl: './modal-inventario-g.component.html',
  styleUrls: ['./modal-inventario-g.component.css']
})
export class ModalInventarioGComponent implements OnInit {

  constructor(    
    public dialogRef: MatDialogRef<ModalInventarioGComponent>,
    @Inject(MAT_DIALOG_DATA) public inventario:Inventario_generalModel ) 
    { }

  
  onNoClick(): void{
    this.dialogRef.close();
  }  

  

  ngOnInit(): void {
    
  }

}
