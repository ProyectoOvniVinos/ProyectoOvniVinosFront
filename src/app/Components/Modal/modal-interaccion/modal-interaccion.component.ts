import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../DialogData';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
  selector: 'app-modal-interaccion',
  templateUrl: './modal-interaccion.component.html',
  styleUrls: ['./modal-interaccion.component.css']
})
export class ModalInteraccionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  onNoClick(): void{
    this.dialogRef.close();
  }
  ngOnInit(): void {
    
  }
}
