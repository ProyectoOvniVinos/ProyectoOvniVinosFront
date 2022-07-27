import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from '../DialogData';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent implements OnInit {

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
