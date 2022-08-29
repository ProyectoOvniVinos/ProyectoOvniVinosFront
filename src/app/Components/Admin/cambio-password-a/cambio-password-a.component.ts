import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cambio-password-a',
  templateUrl: './cambio-password-a.component.html',
  styleUrls: ['./cambio-password-a.component.css']
})
export class CambioPasswordAComponent implements OnInit {
  cambioForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
