import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-datos',
  templateUrl: './editar-datos.component.html',
  styleUrls: ['./editar-datos.component.css']
})
export class EditarDatosComponent implements OnInit {

  banderaPasswordTwo: boolean = false;
  

  actualizarForm !: FormGroup;
  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.crearListeners();
  } 
  
  ngOnInit(): void {

  }

  crearListeners() {
    this.actualizarForm.get('nombre')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('apellido')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('direccion')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('celular')?.valueChanges.subscribe(console.log);
    this.actualizarForm.get('correo')?.valueChanges.subscribe(console.log);
  }

  get nombreControl(): FormControl{
    return this.actualizarForm.get('nombre') as FormControl
  }

  get apellidoControl(): FormControl{
    return this.actualizarForm.get('apellido') as FormControl
  }

  get direccionControl(): FormControl{
    return this.actualizarForm.get('direccion') as FormControl
  }

  get celularControl(): FormControl{
    return this.actualizarForm.get('celular') as FormControl
  }

  get contrasena1Control(): FormControl{
    return this.actualizarForm.get('contrasena1') as FormControl
  }

  get contrasena2Control(): FormControl{
    return this.actualizarForm.get('contrasena2') as FormControl
  }


  get nombreNoValido() {
    if(this.actualizarForm.get('nombre')?.touched){
      if(this.actualizarForm.get('nombre')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }

  }
  get apellidoNoValido() {
    if(this.actualizarForm.get('apellido')?.touched){
      if(this.actualizarForm.get('apellido')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('apellido')?.invalid && this.registroForm.get('apellido')?.touched;
  }
  get direccionNoValido() {
    if(this.actualizarForm.get('direccion')?.touched){
      if(this.actualizarForm.get('direccion')?.invalid == false){
        return false;
      }else{
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('direccion')?.invalid && this.registroForm.get('direccion')?.touched;
  }
  get celularNoValido() {
    if(this.actualizarForm.get('celular')?.touched){
      try {
        let numero = Number(this.actualizarForm.get('celular')?.value);
        if(numero){
          if(this.actualizarForm.get('celular')?.invalid == false){
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
      } catch (error) {
        return true;
      }
    }else{
      return null;
    }
    //return this.registroForm.get('celular')?.invalid && this.registroForm.get('celular')?.touched;
  }
  get contrasena1NoValido() {
    if(this.actualizarForm.get('contrasena1')?.touched){
      if(this.actualizarForm.get('contrasena1')?.invalid == false){
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
    const contrasena1 = this.actualizarForm.get('contrasena1')?.value;
    const contrasena2 = this.actualizarForm.get('contrasena2')?.value;
    if(this.actualizarForm.get('contrasena2')?.touched){
      if(this.actualizarForm.get('contrasena2')?.invalid == false){
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
    //return (this.registroForm.get('contrasena2')?.touched && this.registroForm.get('contrasena2')?.invalid) ? true : (contrasena1 === contrasena2) ? false : true;
    //return (contrasena1 === contrasena2) ? false : true && this.registroForm.get('contrasena2')?.touched;
  }


  crearFormulario() {
    this.actualizarForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required]],
      direccion:['', [Validators.required, Validators.minLength(3)]],
      celular:['',[Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]/)]],
      contrasena1: ['', [Validators.required, Validators.minLength(8)]],
      contrasena2: ['', Validators.required]
    })
  }

}
