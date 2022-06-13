import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recuperando-password',
  templateUrl: './recuperando-password.component.html',
  styleUrls: ['./recuperando-password.component.css']
})
export class RecuperandoPasswordComponent implements OnInit {

  public recuperandoForm = new FormGroup({
    password: new FormControl('',[Validators.required]),
    passwordConfirmacion: new FormControl('',[Validators.required]),
  });

  get passwordControl(): FormControl{
    return this.recuperandoForm.get('password') as FormControl;
  }

  get passwordConfirmacionControl(): FormControl{
    return this.recuperandoForm.get('passwordConfirmacion') as FormControl;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
