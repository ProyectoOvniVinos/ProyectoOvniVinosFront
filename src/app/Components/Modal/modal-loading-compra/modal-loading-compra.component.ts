import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-loading-compra',
  templateUrl: './modal-loading-compra.component.html',
  styleUrls: ['./modal-loading-compra.component.css']
})
export class ModalLoadingCompraComponent implements OnInit {

  constructor(    
    public dialogRef: MatDialogRef<ModalLoadingCompraComponent>) 
    { 
      dialogRef.disableClose = true
      dialogRef.backdropClick()
    }

  
  onNoClick(): void{
    this.dialogRef.close();
  }  

  ngOnInit(): void {

  }

}
