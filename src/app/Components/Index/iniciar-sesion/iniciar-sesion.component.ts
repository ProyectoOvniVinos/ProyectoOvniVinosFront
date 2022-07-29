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
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
  });

  get emailControl(): FormControl{
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }

  get passwordNoValido() {
    if(this.loginForm.get('password')?.touched){
      if(this.loginForm.get('password')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  get emailNoValido() {
    if(this.loginForm.get('email')?.touched){
      if(this.loginForm.get('email')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  constructor() { }

  ngOnInit(): void {
    

  }

}
