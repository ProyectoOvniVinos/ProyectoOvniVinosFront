import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });

  get emailControl(): FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
