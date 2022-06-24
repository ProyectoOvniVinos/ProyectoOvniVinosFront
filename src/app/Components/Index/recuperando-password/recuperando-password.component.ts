import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recuperando-password',
  templateUrl: './recuperando-password.component.html',
  styleUrls: ['./recuperando-password.component.css']
})
export class RecuperandoPasswordComponent implements OnInit {

  public recuperandoForm = new FormGroup({
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    passwordConfirmacion: new FormControl('',[Validators.required]),
  });

  get passwordControl(): FormControl{
    return this.recuperandoForm.get('password') as FormControl;
  }

  get passwordConfirmacionControl(): FormControl{
    return this.recuperandoForm.get('passwordConfirmacion') as FormControl;
  }
  
  get contrasena1NoValido() {
    if(this.recuperandoForm.get('password')?.touched){
      if(this.recuperandoForm.get('password')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('contrasena1')?.invalid && this.registroForm.get('contrasena1')?.touched;
  }

  get contrasena2NoValido() {
    const contrasena1 = this.recuperandoForm.get('password')?.value;
    const contrasena2 = this.recuperandoForm.get('passwordConfirmacion')?.value;
    if(this.recuperandoForm.get('passwordConfirmacion')?.touched){
      if(this.recuperandoForm.get('passwordConfirmacion')?.invalid == false){
        if(contrasena1 === contrasena2){
          return false;
        }else{
          return true;
        }
      }else{
        return true;
      }
    }else{
      return null;
    }
    
    
    //return (this.registroForm.get('contrasena2')?.touched && this.registroForm.get('contrasena2')?.invalid) ? true : (contrasena1 === contrasena2) ? false : true;
    //return (contrasena1 === contrasena2) ? false : true && this.registroForm.get('contrasena2')?.touched;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public prueba(){
    console.log(window.screen);
    console.log(screen.width)
    console.log(screen.height)
  }

}
