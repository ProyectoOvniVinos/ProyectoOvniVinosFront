import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambio-password-a',
  templateUrl: './cambio-password-a.component.html',
  styleUrls: ['./cambio-password-a.component.css']
})
export class CambioPasswordAComponent implements OnInit {
  cambioForm: FormGroup;
  banderaPasswordTwo: boolean ;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  get passwordOneControl(): FormControl{
    return this.cambioForm.get('passwordOne') as FormControl
  }

  get passwordTwoControl(): FormControl{
    return this.cambioForm.get('passwordTwo') as FormControl
  }


  get passwordOneNoValido() {
    if(this.cambioForm.get('passwordOne')?.touched){
      if(this.cambioForm.get('passwordOne')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  get passwordTwoNoValido() {
    const contrasena1 = this.cambioForm.get('passwordOne')?.value;
    const contrasena2 = this.cambioForm.get('passwordTwo')?.value;
    if(this.cambioForm.get('passwordTwo')?.touched){
      if(this.cambioForm.get('passwordTwo')?.invalid == false){
        if(contrasena1 === contrasena2){
          this.banderaPasswordTwo=true;
          return false;

        }else{
          this.banderaPasswordTwo=false;
          return true;
        }
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  crearFormulario() {
    this.cambioForm = this.fb.group({
      passwordOne: ['', [Validators.required, Validators.minLength(8)]],
      passwordTwo: ['', Validators.required]
    })
  }


}
