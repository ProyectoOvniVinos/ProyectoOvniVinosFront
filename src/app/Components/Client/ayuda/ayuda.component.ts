import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {

  ayudaForm !: FormGroup;
  banderaTextoOtro: Boolean;

  constructor(private fb: FormBuilder) { 
    this.crearFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get correoControl(): FormControl{
    return this.ayudaForm.get('correo') as FormControl
  }

  get problemasControl(): FormControl{
    return this.ayudaForm.get('problemas') as FormControl
  }

  get textoOtraControl(): FormControl{
    return this.ayudaForm.get('textoOtra') as FormControl
  }

  get correoNoValido() {
    if(this.ayudaForm.get('correo')?.touched){
      if(this.ayudaForm.get('correo')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  get problemasNoValido() {
    if(this.ayudaForm.get('problemas')?.touched){
      if(this.ayudaForm.get('problemas')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }
  
  get textoOtraNoValido() {
    if(this.ayudaForm.get('textoOtra')?.touched){
      if(this.ayudaForm.get('textoOtra')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }

  crearFormulario() {
    this.ayudaForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      problemas: ['', []],
      textoOtra: ['',[]]
    })
  }

  
  crearListeners() {
    this.ayudaForm.get('correo')?.valueChanges.subscribe(console.log);
    this.ayudaForm.get('problemas')?.valueChanges.subscribe(console.log);
    this.ayudaForm.get('textoOtra')?.valueChanges.subscribe(console.log);
  }

  validar(){
    console.log("validando");
    
    console.log(this.ayudaForm.controls['problemas'].value)

    if(this.ayudaForm.controls['problemas'].value=="Otra"){
      this.banderaTextoOtro= true;
    }else{
      this.banderaTextoOtro=false;
    }
  }


}
