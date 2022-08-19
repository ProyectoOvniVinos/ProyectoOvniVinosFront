import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrls: ['./modal-loading.component.css']
})
export class ModalLoadingComponent implements OnInit {

  constructor(    
    public dialogRef: MatDialogRef<ModalLoadingComponent>) 
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
