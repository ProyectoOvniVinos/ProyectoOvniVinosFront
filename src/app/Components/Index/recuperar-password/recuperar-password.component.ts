import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  public recuperarForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    codigo: new FormControl('',[Validators.required]),
  });

  
  get emailControl(): FormControl{
    return this.recuperarForm.get('email') as FormControl;
  }

  get codigoControl(): FormControl{
    return this.recuperarForm.get('codigo') as FormControl;
  }

  get emailNoValido() {
    if(this.recuperarForm.get('email')?.touched){
      if(this.recuperarForm.get('email')?.invalid == false){
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
